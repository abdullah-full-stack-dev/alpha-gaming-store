const Razorpay = require("razorpay");

// Razorpay Integretion
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

console.log("KEY:", process.env.RAZORPAY_API_KEY);
console.log("SECRET:", process.env.RAZORPAY_API_SECRET);

module.exports = instance;