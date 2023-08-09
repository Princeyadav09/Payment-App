import { useEffect, useState } from 'react';
import './App.css';
import Payment from './component/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`http://localhost:4000/api/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    getStripeApikey();
  }, [])
 

  return (
    <>
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          
                  <Payment/>
              
        </Elements>
      )}

    </>
  );
}

export default App;
