const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
))

app.use(bodyParser.json());

app.use("/test", (req, res) => {
    res.send("Hello world!");
});

const payment = require("./route/payment");

app.use("/api",payment);

app.listen(4000,()=>{
    console.log("Server is running on http:localhost:4000");
})