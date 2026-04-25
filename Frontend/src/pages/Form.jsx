import { useContext, useState } from 'react';
import '../CSS/Form.css'
import backVideo from "../assets/videos/form-back6.mp4"
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AppContext';

export const Form = () => {

  const {getUserData} = useContext(AuthContext)

  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState("signup");
  let [password, showPassword] = useState(false);
  let [password3, showPassword3] = useState(false);

  // Sign Up Form

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    
    e.preventDefault();

    
    axios.defaults.withCredentials = true  // Sending Cookies

    axios.post(`https://alpha-gaming-store.onrender.com/alpha-gaming/register`, form).then((res) => {
      // console.log(res.data);

      if (res.data.message === "User Already Exists") {
        toast.warning("Email already exists!")
      } else {
        setForm({
          name: "",
          email: "",
          password: ""
        });
        toast.success("Account Created Successfully!")
        getUserData()

        setTimeout(() => {
          navigate("/");
        }, 3500);
      }

    });

  }

  // Login Form

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const handleChange2 = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true  // Sending Cookies

    axios.post(`https://alpha-gaming-store.onrender.com/alpha-gaming/login`, loginForm).then((res) => {
      console.log(res.data);
      if (res.data.message === "Invalid email" || res.data.message === "Invalid password") {
        toast.error("Invalid email or password")
      }
      else {


        setLoginForm({
          email: "",
          password: ""
        });

        toast.success("Login Successfully!")
        getUserData()

        setTimeout(() => {
          navigate("/");
        }, 3500);
      }

    })

  };





  return (

    <div className='form-page'>

      <video src={backVideo} autoPlay muted loop className="bg-video2" />

      <div className="user-account-box" >

        <div style={{ marginBottom: "10px", opacity: "0.4" }}>
          {activeForm === "signup" ? <h2 style={{ fontWeight: "200" }}>Create your account</h2> : <h2 style={{ fontWeight: "200" }}>Login to your account</h2>}
        </div>

        <div className="form-name">

          <h2 className={`form-title ${activeForm === "signup" ? "activeForm" : ""}`} onClick={() => setActiveForm("signup")}>SignUp</h2>

          <h2 className={`form-title ${activeForm === "login" ? "activeForm" : ""}`} onClick={() => setActiveForm("login")}>Login</h2>
        </div>


        {activeForm === "signup" && (
          <form className="signUpForm" onSubmit={handleSubmit} >


            <input type="text" placeholder="Enter Your Name" name="name" autoComplete='off' onChange={handleChange} value={form.name} required />

            <input type="email" placeholder="Enter Your Email" name="email" autoComplete='off' onChange={handleChange} value={form.email} required />


            <input type={password ? "text" : "password"} placeholder="Enter Your Password" name="password" className='input-password' autoComplete='off' onChange={handleChange} value={form.password} required />
            {password ? <i className="fa-solid fa-eye" onClick={() => showPassword(!password)}></i> : <i className="fa-solid fa-eye-slash" onClick={() => showPassword(!password)} ></i>}



            <p>Already Have an Account? <span onClick={() => setActiveForm("login")}>Login</span> </p>
            <button type="submit" className="user-btn">Sign Up</button>
          </form>
        )}

        {activeForm === "login" && (
          <form className="loginForm" onSubmit={handleLogin} >
            <input type="email" placeholder="Enter Your Email" name="email" autoComplete='off' onChange={handleChange2} value={loginForm.email} required />


            <input type={password3 ? "text" : "password"} placeholder="Enter Your Password" name="password" className='input-password' autoComplete='off' onChange={handleChange2} value={loginForm.password} required />
            {password3 ? <i className="fa-solid fa-eye" onClick={() => showPassword3(!password3)}></i> : <i className="fa-solid fa-eye-slash" onClick={() => showPassword3(!password3)}></i>}
            <p>Forgot Password? <Link to={"/reset-password"}><span>Click Here</span></Link> </p>
            <p>Don't Have an Account? <span onClick={() => setActiveForm("signup")}>Sign Up</span> </p>
            <button type="submit" className="user-btn">Login</button>
          </form>
        )}
      </div>

      <div className="form-page-content">
        <h1>Every legend starts somewhere. <br />Start yours at <span>ALPHA.</span></h1>
      </div>

    </div>
  )
}
