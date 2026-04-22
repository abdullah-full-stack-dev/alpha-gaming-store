import React, { useState } from 'react'
import '../CSS/About.css'
// import aboutVideo from "../assets/videos/about-video.mp4"
import aboutImg from "../assets/images/about-img.png"

export default function About() {

    const [para, setPara] = useState(false)

    return (
        <div className='about-page'>

            {/* <div className="heading-cont">
                <span className="heading"><b>About Alpha</b></span>
            </div> */}
            <section className="about-section">

                <div className="about-container">

                    <div className="about-media">

                        {/* <video src={aboutVideo} autoPlay muted loop /> */}
                        <img src={aboutImg} alt="about-img" />

                    </div>

                    <div className="about-content">


                        <p>
                            ALPHA is a modern online gaming store created for gamers who want easy access to the latest and most popular PC games.
                            Our platform brings together a wide collection of titles from different genres,
                            making it simple to discover and purchase your favorite games.
                        </p>
                        <p>
                            At ALPHA, we focus on providing a smooth and secure experience where gamers can explore new releases, trending games, and exclusive deals.
                            Whether you're looking for action-packed adventures, strategy games, or multiplayer titles,
                            ALPHA helps you find the perfect game for your collection.
                        </p>

                        <div className={`hidden-content ${para ? "showPara" : ""}`}>
                            <p>
                                Our mission is simple —
                                to make game purchasing easy, fast, and reliable.
                                We aim to provide gamers with a seamless platform where they can discover and buy their favorite titles without hassle.
                            </p>
                            <h3><i className="fa-solid fa-circle-question"></i> What We Offer</h3>
                            <ul>
                                
                                <li><i className="fa-solid fa-gamepad"></i> Latest PC game releases</li>
                                <li><i className="fa-solid fa-money-bill-transfer"></i> Exclusive deals & discounts</li>
                                <li><i className="fa-solid fa-bolt"></i> Instant access & smooth experience</li>
                                <li><i className="fa-solid fa-lock"></i> Safe and secure transactions</li>
                            </ul>
                        </div>



                        <a className="about-btn" onClick={() => setPara(!para)}>

                            {para ? "Show Less" : "Show More"} <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </section>

        </div>
    )
}
