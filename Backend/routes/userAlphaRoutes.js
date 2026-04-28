let express = require("express");
const { userDetailInsert } = require("../controller/userContactController");
const { newsLetterInsert } = require("../controller/userNewsLetterController");
const { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, resetPassword, sendResetOtp } = require("../controller/authController");
const userAuth = require("../middleware/userAuth");
const processPayment = require("../controller/productController");
let alphaRouter = express.Router();

alphaRouter.post("/insert",userDetailInsert)
alphaRouter.post("/insert-subscription",newsLetterInsert)

alphaRouter.post("/register",register);
alphaRouter.post("/login",login);
alphaRouter.post("/logout",logout);

alphaRouter.post("/send-verify-otp",userAuth, sendVerifyOtp);
alphaRouter.post("/verify-account",userAuth, verifyEmail);
alphaRouter.post("/is-auth",userAuth, isAuthenticated);

alphaRouter.post("/send-reset-otp", sendResetOtp);
alphaRouter.post("/reset-password", resetPassword);

// Razorpay Integretion API
alphaRouter.post("/payment/process", processPayment);



module.exports = alphaRouter;