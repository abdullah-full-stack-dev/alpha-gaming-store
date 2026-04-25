import React, { useState } from 'react'
import '../CSS/ForgotPassword.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {



    axios.defaults.withCredentials = true;

    const [email, setEmail] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [isEmailSent, setIsEmailSent] = useState("")
    const [otp, setOtp] = useState("")
    const [isOtpSubmitted, setisOtpSubmitted] = useState(false)

    const inputRefs = React.useRef([])

    const navigate = useNavigate()

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && e.target.value === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text")
        const pasteArray = paste.split("");
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });
    }

    const onSubmitEmail = async (e)=>{
        e.preventDefault();

        try {
            const {data} = await axios.post("https://alpha-gaming-store.onrender.com/alpha-gaming/send-reset-otp", {email})
            data.status === 1 ? toast.success(data.message) : toast.error(data.message)
            data.status === 1 && setIsEmailSent(true)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitOtp = async (e)=>{
        e.preventDefault();

        const otpArray = inputRefs.current.map(e => e.value)
        setOtp(otpArray.join(""))
        setisOtpSubmitted(true)
    }

    const onSubmitNewPassword = async (e)=>{
        e.preventDefault();

        try {
            const {data} = await axios.post("https://alpha-gaming-store.onrender.com/alpha-gaming/reset-password", {email,otp,newPassword})
            data.status === 1 ? toast.success(data.message) : toast.error(data.message)
            data.status === 1 && navigate("/account")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='forgotPasswordContainer'>

            {!isEmailSent &&

                <div className="reg-input-cont">
                    <form onSubmit={onSubmitEmail}>
                        <h1>Reset Password</h1>
                        <p>Enter Your Registered Email Id</p>
                        <div className="reg-input-email">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" placeholder='Enter Your Email' value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <button type='submit' className='forgot-pass-btn'>Submit</button>
                    </form>
                </div>
            }
            {/* Forgot Password OTP */}


            {!isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitOtp}>
                    <div className="forgotPassOtpBox">
                        <h1>Reset Password OTP</h1>
                        <p>Enter 6-digit code sent to your Email.</p>
                        <div className="forgotPassOtp" onPaste={handlePaste}>

                            {Array(6).fill(0).map((_, index) => (
                                <input type="text" maxLength={1} required className='forgotPassOtpInput' key={index} ref={e => inputRefs.current[index] = e}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}

                                />
                            ))}

                        </div>
                        <button className='forgotPassBtn' type='submit'>Submit</button>
                    </div>
                </form>
            }

            {/* New Password */}

            {isOtpSubmitted && isEmailSent &&
                <div className="reg-input-cont">
                    <form onSubmit={onSubmitNewPassword}>
                        <h1>New Password</h1>
                        <p>Enter Your New Password</p>
                        <div className="reg-input-email">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" placeholder='Enter New Password' value={newPassword} onChange={e => setnewPassword(e.target.value)} required />
                        </div>
                        <button type='submit' className='forgot-pass-btn'>Submit</button>
                    </form>

                </div>
            }
        </div>
    )
}
