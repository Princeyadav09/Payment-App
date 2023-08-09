import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { RxCross1 } from "react-icons/rx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const[price,setPrice] = useState(90);
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = useState(false);

  const order = {};

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

              toast.success("Payment Completed!");
              console.log("payment ho gya");

    // await axios
    //   .post(`${server}/order/create-order`, order, config)
    //   .then((res) => {
    //     setOpen(false);
    //     // navigate("/order/success");
    //     toast.success("Order successful!");
    //     localStorage.setItem("cartItems", JSON.stringify([]));
    //     localStorage.setItem("latestOrder", JSON.stringify([]));
    //     window.location.reload();
    //   });
  };


  const paymentHandler = async (e)=>{
        e.preventDefault();
        setPrice(price);

        const resp = await axios.post("http://localhost:4000/api/payment",
             {amount: price}
          )
          const client_secret = resp.data.client_secret;

          if (!stripe || !elements) return;
          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
            },
          });

          if (result.error) {
            toast.error(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              order.paymnentInfo = {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
                type: "Credit Card",
              };
              toast.success("Payment Completed!");
              console.log("payment ho gya");
            }
          }
  }

  return (
   <>
         <div className=" flex border-b m-20">
          <h1 className='text-green-600 font-bold'>Card Payment</h1>
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={"Name"}
                    className={`w-full border p-1 rounded-[5px] !w-[95%] text-[#444]`}
                   
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`w-full border p-1 rounded-[5px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`w-full border p-1 rounded-[5px] !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={`w-full border p-1 rounded-[5px] !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>

{/* Paypal payment options */}
          
          <div className=" flex border-b m-20">
          <h1 className='text-green-600 font-bold me-10'>Paypal <br /> Payment</h1>
            <div
              className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={onApprove}
                        // createOrder={createOrder}
                      />
                    </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>


          <ToastContainer />
   </>
  );
}

export default Payment;
