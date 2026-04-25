import React, { useState } from 'react'
import '../CSS/Contact.css'
import axios from 'axios';
import { toast } from 'react-toastify';

export const Contact = () => {


    const [contactForm, setContactForm] = useState({
        name:"",
        email: "",
        message: ""
      });

      const handleChange = (e) => {
        setContactForm({
          ...contactForm,
          [e.target.name]: e.target.value
        });
      };

      const saveEnquiry = async (e) => {
        e.preventDefault();
    
        axios.post(`https://alpha-gaming-store.onrender.com/alpha-gaming/insert`, contactForm).then((res) => {
          console.log(res.data);
    
            setContactForm({
              name:"",
              email: "",
              message: ""
            });
    
            toast.success("Your message has been sent successfully!")
    
        })
    
      };

    return (
        <div className='contact-page'>

            <section className="contact-section" id="contact">
                <div className="contact-container">

                    <div className="contact-info">
                        <h2>Contact Us</h2>
                        <p>
                            Have questions about a game, purchase, or your account?<br />
                            Our team is here to help.
                        </p>
                        <p>
                            If you need assistance with orders, game availability, <br/>or any other inquiries,
                            feel free to reach out to us.<br/>
                            We are always ready to help gamers get the best experience on ALPHA.
                        </p>

                        <ul>
                            <li><i className="fa-solid fa-envelope"></i> Game Support & Feedback</li>
                            <li><i className="fa-solid fa-location-arrow"></i> Get in touch with ALPHA.</li>
                            <li><i className="fa-solid fa-phone"></i> Need support? Contact us.</li>
                        </ul>

                        <span className="tagline">
                            ALPHA — Where Gamers Belong.
                        </span>

                        <ul className="socialIcons">

                            <li><a><i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li><a><i className="fa-brands fa-facebook"></i></a>
                            </li>
                            <li><a><i className="fa-brands fa-github"></i></a>
                            </li>
                        </ul>

                    </div>

                    <div className="contact-form">
                        <form onSubmit={saveEnquiry}>
                            <input type="text" placeholder="Your Name" name="name" onChange={handleChange} value={contactForm.name} required />
                            <input type="email" placeholder="Your Email" name="email" onChange={handleChange} value={contactForm.email} required />
                            <textarea placeholder="Your Message" rows="5" name="message" onChange={handleChange} value={contactForm.message} required></textarea>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>

                </div>
            </section>

        </div>
    )
}
