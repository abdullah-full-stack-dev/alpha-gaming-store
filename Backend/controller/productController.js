// Razorpay Integretion

const instance = require("../config/razorpayInstance");


const processPayment = async (req,res)=>{

    const options = {
        amount:1000,
        currency:"INR"   
    }

    const order = await instance.orders.create(options)

    res.send({
        status: 1, 
        message: "Razorpay successfull", 
        order
    })
}

module.exports = processPayment;


