const userModel = require("../models/userModel");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

const register = async (req, res) => {

    // Get From Frontend
    const { name, email, password } = req.body;

    // console.log("EMAIL:", email);

    // Checking if any one field is empty
    if (!name || !email || !password) {
        return res.send({
            status: 0, message: "Detail is missing!"
        });
    }

    try {

        // Checking if any existing User
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.send({
                status: 0, message: "User Already Exists"
            });
        }

        // Making password into hash password (encrypt)
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: true,
            sameSite: "none",   // strict hatao
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Sending Email When Signing Up
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome To Alpha",
            text: `Welcome To Alpha Gaming Store. Your Account Has Been Created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions);

        // continue
        return res.send({
            status: 1, message: "successfull"
        });


    } catch (error) {
        res.send({
            status: 0, message: error.message
        });
    }
}

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({
            status: 0, message: "Email or Password are required!"
        });
    }

    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.send({
                status: 0, message: "Invalid email"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.send({
                status: 0, message: "Invalid password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.send({
            status: 1, message: "successfull"
        });


    } catch (error) {
        return res.send({
            status: 0, message: error.message
        });
    }
}

const logout = async (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })

        return res.send({
            status: 1, message: "logged Out"
        });

    } catch (error) {
        return res.send({
            status: 0, message: error.message
        });
    }
}


// Sending Verification OTP to User's Email

const sendVerifyOtp = async (req, res) => {

    try {

        // const {userId} = req.body;
        const userId = req.user.userId;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.send({
                status: 1, message: "Account Already Verified!"
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        // Sending Otp to User's Email for Verification
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP for Verification is ${otp}. Verify your account using this OTP.
            Do not share it with someone else.`
        }

        await transporter.sendMail(mailOption);

        res.send({
            status: 1, message: "Verification OTP sent on Email."
        });


    } catch (error) {
        return res.send({
            status: 0, message: error.message
        });
    }
}



const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    // const userId = req.body.userId;
    const userId = req.user.userId;
    console.log("BODY:", req.body);
    console.log("USER ID:", req.body.userId);
    console.log("OTP:", req.body.otp);

    if (!userId || !otp) {
        return res.send({
            status: 0, message: "Missing Details!"
        });
    }



    try {

        const user = await userModel.findById(userId);

        if (!user) {
            return res.send({
                status: 0, message: "User Not Found"
            });
        }

        if (user.verifyOtp === "" || user.verifyOtp !== otp) {
            return res.send({
                status: 0, message: "Invalid OTP!"
            });
        }



        if (user.verifyOtpExpireAt < Date.now()) {
            return res.send({
                status: 0, message: "OTP Expired!"
            });
        }

        user.isAccountVerified = true;

        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.send({
            status: 1, message: "Email Verified Successfully!"
        });

    } catch (error) {
        return res.send({
            status: 0, message: error.message
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        return res.send({
            status: 1, message: "Authenticated Successfully!"
        });

    } catch (error) {
        return res.send({
            status: 0, message: error.message
        });
    }
}


//Sending Password Reset OTP

const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.send({
            status: 0, message: "Email is Required"
        });
    }

    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.send({
                status: 0, message: "User Not Found!"
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save();


        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for Resetting your password is ${otp}. Use this OTP to reset your password.
            Do not share it with someone else.`
        }

        await transporter.sendMail(mailOption);

        return res.send({
            status: 1, message: "OTP sent to your Email."
        });


    } catch (error) {
        return res.send({
            status: 0, message: error.message
        });
    }
}


//Reset User Password

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.send({
            status: 0, message: "email, otp, and newPassword are required!"
        });
    }

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.send({
                status: 0, message: "User Not Found!"
            });
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.send({
                status: 0, message: "Invalid OTP!"
            });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.send({
                status: 0, message: "OTP Expired!"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.send({
            status: 1, message: "Password has been reset Successfully!"
        });


    } catch (error) {
        return res.send({
            status: 0, message: error.message
        });
    }
}



module.exports = { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword };