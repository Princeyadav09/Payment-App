const express = require('express')
const router = express.Router()
const stripe = require("stripe")("sk_test_51NXKgcSHrvGgBqUT8vhJ1mDoYqBaGBO3VvHD0NzdOLNaJagQHk1gGGhjNSDz7gTcNx1O3YYSazh0SAXAlmVQTmEK00PsNsPRxL");

router.post("/payment", async (req, res) => {
    try {
        const amount = req.body.amount;
        const myPayment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "inr",
            metadata: {
                company: "Prince",
            },
        })
        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret,
          });
    } catch (error) {
        res.status(400).json('Payment not completed');
    }

})

router.get("/stripeapikey",async (req, res, next) => {
        res.status(200).json({ stripeApikey: "pk_test_51NXKgcSHrvGgBqUTvYmYxGr3bQort4BmPOs9Q9STdcweu9wxdR8n0w7nattwrnNXCPplyOJ9DzyeZffSwTGv7TUM00dDBYgSYX" });
    }
);

module.exports = router;