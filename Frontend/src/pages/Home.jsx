import React, { useEffect, useRef } from 'react'
import '../CSS/Home.css'
// import { ReactTyped } from "react-typed";
import backVideo from "../assets/videos/home-background.mp4" // HomePage-background-video
import char from "../assets/images/char.png"
import secondaryImage from "../assets/images/home-secondary-image.jpg"
import gta6 from "../assets/images/gta6.jpg"
import wolverine from "../assets/images/wolverine.jpg"
import tombraider from "../assets/images/tomb-raider.png"
import firstlight from "../assets/images/firstLight.jpg"
import { HomeProducts } from '../Components/HomeProducts'
import { Link, NavLink } from 'react-router-dom'
import Typed from 'typed.js';

export const Home = () => {

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "Buy Latest PC Games",
                "Explore New Releases",
                "Best Deals Available"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div>


            {/* Primary-Home-Section */}
            <section className='home-section'>



                {/* HomePage-background-video */}
                <video src={backVideo} autoPlay muted loop className="bg-video" />


                <div className="home-container">
                    <div className="home-content">
                        <h1>Welcome to <span>ALPHA</span> - The World of Gaming Awaits. </h1>
                        <p className='para1'>Explore a huge collection of top PC games, trending titles, and exclusive deals.</p>
                        <p className='para2'> Build your gaming library with the newest releases and fan-favorite classics — <br />all in one place.</p>

                        <div className="typed-text-cont">
                            <i className="fa-solid fa-earth-oceania"></i>
                            <h3 ref={el}></h3>
                        </div>

                        <div className="home-btn-container">
                            <div className="home-btn">
                                <NavLink to={"/account"} className='Link' ><button className="btn-alpha"><i className="fa-solid fa-archway"></i> Enter Alpha</button></NavLink>
                                <NavLink to={"/collections"} className='Link' ><button className="btn-discover"><i className="fa-solid fa-bag-shopping"></i> Shop Games</button></NavLink>
                            </div>
                        </div>




                    </div>

                </div>
            </section>

            {/* Secondary-Home-Section */}
            <section className="alpha-hero">
                <div className="hero-container">


                    <div className="hero-image">
                        <img src={char} alt="3D Gaming Character" />
                    </div>


                    <div className="hero-content">
                        <h1>ENTER THE WORLD OF <span>ALPHA</span></h1>

                        <p className="tagline">
                            Your ultimate destination to discover and buy amazing PC games.
                        </p>

                        <p className="description">
                            Browse the latest game releases, explore trending titles, and <br />grab exclusive discounts on your favorite games.
                        </p>

                        <div className="hero-buttons">
                            <Link to={"/collections"} className='Link' ><button className="btn primary2"><i className="fa-solid fa-globe"></i> Explore Games</button></Link>
                            <Link to="/collections#new-released"><button className="btn secondary2"><i className="fa-solid fa-fire"></i> New Released</button></Link>
                            
                        </div>
                    </div>

                </div>
            </section>

            {/* <section className="alpha-hero hero-secondary" >
                <div className="hero-container">


                    <div className="hero-image">
                        <img src={characters} alt="3D Gaming Character" />
                    </div>


                    <div className="hero-content">
                        <h1>Discover Our PC Games</h1>

                        <p className="tagline">
                       
                        </p>

                        <p className="description">
                        Explore a world of gaming where action-packed adventures keep your adrenaline high, immersive RPGs pull you into deep story-driven universes, and high-speed racing games push your limits on every track—bringing you the ultimate collection for every kind of gamer.
                        </p>

                        <div className="hero-buttons">
                            <button className="btn3 primary3">Action</button>
                            <button className="btn3 secondary3">Adventure</button>
                            <button className="btn3 primary3">Open World</button>
                            <button className="btn3 secondary3">Racing</button>
                            <button className="btn3 primary3">Shooting</button>
                        </div>
                    </div>

                </div>
            </section> */}









            <section className='secondary-home-section'>
                <img src={secondaryImage} alt="image" />


                <div className="secondary-home-content">
                    <h1><span>Discover </span> Our PC Games</h1>

                    <p className="secondary-home-description">
                        Explore a world of gaming where action-packed adventures keep your adrenaline high, immersive RPGs pull you into deep story-driven universes, <br />and high-speed racing games push your limits on every track—bringing you the ultimate collection for every kind of gamer.
                    </p>

                    <div className="hero-buttons">
                        <Link to={"/category/action"} ><button className="btn3">Action</button></Link>
                        <Link to={"/category/adventure"}><button className="btn3">Adventure</button></Link>
                        <Link to={"/category/open-world"}><button className="btn3">Open World</button></Link>
                        <Link to={"/category/racing"} ><button className="btn3">Racing</button></Link>
                        <Link to={"/category/shooting"} ><button className="btn3">Shooting</button></Link>


                    </div>
                </div>
            </section>










            {/* Upcomming-Games-Section */}
            <section id="upcomming">

                <div className="heading-cont">
                    <span className="heading head">Upcomming Games</span>
                </div>

                <div className="upCommingList">
                    <div className="container left-container">
                        <div className="game-box one">
                            <img src={gta6} />
                        </div>
                        <div className="gamesDesc">
                            <h3>GTA VI</h3>
                            <div>
                                Return to the streets of Vice City in Grand Theft Auto VI, Rockstar’s most ambitious open-world
                                yet.
                                Experience a modern crime saga with dual protagonists, stunning realism, and a living world that
                                evolves with every choice you make.
                            </div>


                            <button className="PreOrder-btn">PreOrder</button>
                        </div>
                    </div>

                    <div className="container right-container">
                        <div className="game-box two">
                            <img src={wolverine} />
                        </div>
                        <div className="gamesDesc">
                            <h3>Marvel’s
                                Wolverine</h3>
                            <div>
                                Step into the claws of Wolverine in a gritty, story-driven action adventure. Brutal combat,
                                emotional storytelling, and a darker Marvel tone bring Logan’s legendary rage and resilience to
                                life.
                            </div>

                            <br />
                            <button className="PreOrder-btn">PreOrder</button>
                        </div>
                    </div>

                    <div className="container left-container">
                        <div className="game-box three" >
                            <img src={tombraider} />
                        </div>
                        <div className="gamesDesc">
                            <h3>Tomb Raider:
                                Legacy of Atlantis</h3>
                            <div>
                                Lara Croft dives into myth and mystery in Legacy of Atlantis, an action-adventure blending
                                exploration, ancient puzzles, and cinematic combat as she uncovers secrets buried beneath the
                                ocean’s lost civilization.
                            </div>

                            <br />
                            <button className="PreOrder-btn">PreOrder</button>
                        </div>
                    </div>

                    <div className="container right-container">
                        <div className="game-box four">
                            <img src={firstlight} />
                        </div>
                        <div className="gamesDesc">
                            <h3>007: First
                                Light</h3>
                            <div>
                                Become James Bond in 007: First Light, a cinematic spy action game featuring stealth, high-tech
                                gadgets, globe-trotting missions, and intense gunplay that redefines the origin of the world’s
                                most
                                iconic secret agent.
                            </div>

                            <br />
                            <button className="PreOrder-btn">PreOrder</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending-Games-Section */}
            <section className='gaming-cards' id='trending'>
                <HomeProducts />
            </section>



        </div>
    )
}
