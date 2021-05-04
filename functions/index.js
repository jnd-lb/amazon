const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")("sk_test_51ImBl6H2xvXzgvrN5RtLc6XpCvGy16IjboTQTDwMAHXajhmJLsdR4x4WcKTFAx0o8Rv8bpW2r812xQnpvymSjZEP00ALm1YE13");

const app = express();

app.use(cors({origin : true}));
app.use(express.json());


app.get("/",(req,res,next)=>{
    res.json({
        "greeting":"Hi"
    })
});

app.post("/payment/create",async (req,res,next)=>{
    const total = req.query.total;
    console.log("request receive:", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    });

    res.status(201).json({
        "clientSecret": paymentIntent.client_secret
    });
})
exports.api = functions.https.onRequest(app)