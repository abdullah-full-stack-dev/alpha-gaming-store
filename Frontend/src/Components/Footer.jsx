import React, { useState } from 'react'
import '../CSS/Footer.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../assets/images/logo3.png"
import axios from 'axios'
import { toast } from 'react-toastify'


export const Footer = () => {

    const navigate = useNavigate();


    const [newsLetter, setNewsLetter] = useState({
        name: "",
        email: "",
        password: ""
      });
    
      const handleChange = (e) => {
        setNewsLetter({
          ...newsLetter,
          [e.target.name]: e.target.value
        });
      };

      const saveEnquiry = async (e) => {
        e.preventDefault();
    
        axios.post(`https://alpha-gaming-store.onrender.com/alpha-gaming/insert-subscription`, newsLetter).then((res) => {
          console.log(res.data);
    
          setNewsLetter({
              email: ""
            });
    
            toast.success(`Subscribed successfully!`)

            setTimeout(() => {
                navigate("/");
              }, 3500);
    
        })
    
      };

    return (
        <div>

            <footer className="footer">
                {/* <hr className='footer-divider-line'/> */}

                <div className="footer-container">

                    <div className="footer-newsletter">
                        <h3>Join Our Newsletter</h3>
                        <p>Get updates on new releases, exclusive offers, and
                            gaming news.</p>

                        <form className="newsletter-form" onSubmit={saveEnquiry}>
                            <input type="email" placeholder="Enter your email" name='email' onChange={handleChange} value={newsLetter.email} required />
                            <button type="submit">Subscribe</button>
                        </form>

                        <small>No spam. Unsubscribe anytime.</small>

                        <h3 style={{ marginTop: "10px", fontSize:"18px", fontWeight:"300" }}>More Links :</h3>
                        <div className="footer-links">
                            <Link to={"/about"} style={{ color: "white" }}><li>About Us</li></Link>
                            <Link to={"/privacy-policy"} style={{ color: "white" }}><li>Our Policy</li></Link>
                        </div>



                    </div>


                    <div className="footer-about">

                        <NavLink to={"/"}><img src={logo} className="logo" style={{marginBottom:"15px"}} /></NavLink>
                        

                        <p>Your ultimate destination for discovering, competing, and conquering the gaming universe.
                            Explore trending titles, exclusive deals, and build your perfect gaming library.</p>


                        <h3><i className="fa-solid fa-globe"></i> Follow Us</h3>
                        <p>Stay connected for latest releases & offers :</p>
                        <div className='social-links'>
                            <span style={{ marginRight: "12px" }} className='facebook'>Facebook </span>
                            <span style={{ marginRight: "12px" }} className='instagram'>Instagram </span>
                            <span style={{ marginRight: "12px" }} className='twitter'>Twitter </span>
                            <span className='youtube'>YouTube</span>
                        </div>

                    </div>





                </div>
                <p className='footer-bottom'>© 2026 ALPHA Gaming. All Rights Reserved.</p>



            </footer>

        </div>
    )
}
