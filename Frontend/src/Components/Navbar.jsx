import '../CSS/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../assets/images/logo3.png"
import mobileLogo from "../assets/images/logo.png"
import { useEffect, useState } from 'react';
import cartIcon from "../assets/images/cart-icon.png";
import searchIcon from "../assets/images/search-icon.png";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Navbar = () => {

    const navigate = useNavigate();

    const { userData, setUserData } = useContext(AuthContext)

    const logout = async () => {

        try {
            axios.defaults.withCredentials = true  // Sending Cookies
            const { data } = await axios.post(`http://localhost:8000/alpha-gaming/logout`)
            if (data.status === 1) {
                setUserData(false)
                navigate("/")
            }


        } catch (error) {
            toast.error(error.message)
        }
    }

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(`http://localhost:8000/alpha-gaming/send-verify-otp`)
            if (data.status === 1) {
                navigate("/email-verify")
                toast.success(data.message)
            } else {
                toast.success(data.message)
            }


        } catch (error) {
            toast.error(error.message)
        }
    }

    const [scroll, setScroll] = useState(false);

    const [dropMenu, setDropMenu] = useState(false);

    const [showInput, setShowInput] = useState(false);

    // const [showProfile, setShowProfile] = useState(false);

    const [menu, setMenu] = useState(false);

    const { cartItems } = useContext(CartContext);

    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
    }, []);

    let openMenu = () => {
        setDropMenu(!dropMenu)
    }



    return (
        <div>



            <nav className={`navbar ${scroll ? "scrolled" : ""}`}>


                <NavLink to={"/"}>
                    <img src={logo} className="logo" />
                </NavLink>







                <ul className="nav-links">
                    <NavLink to={"/"} className='Link'><li>Home</li></NavLink>
                    <NavLink to={"/about"} className='Link' ><li>About</li></NavLink>
                    <NavLink to={"/collections"} className='Link' ><li>Collection</li></NavLink>


                    <li className="dropdown">
                        <a>Category <span>▼</span></a>
                        <ul className="dropdown-menu">
                            <li> <NavLink to={"/category/action"} className='Link' >Action</NavLink></li>
                            <li> <NavLink to={"/category/adventure"} className='Link' >Adventure</NavLink></li>
                            <li> <NavLink to={"/category/open-world"} className='Link' >Open World</NavLink></li>
                            <li> <NavLink to={"/category/racing"} className='Link' >Racing</NavLink></li>
                            <li> <NavLink to={"/category/shooting"} className='Link' >Shooting</NavLink></li>
                        </ul>
                    </li>

                    <NavLink to={"/contact"} className='Link' ><li>Contact</li></NavLink>


                    {userData
                        ?
                        <div className="profile-Icon">
                            {userData.name[0].toUpperCase()}

                            <div className="profile-list">
                                <ul>
                                    {!userData.isAccountVerified && (<li onClick={sendVerificationOtp}><i className="fa-solid fa-envelope-circle-check"></i> Verify Email</li>)}

                                    <li onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</li>
                                </ul>
                            </div>
                        </div>

                        :
                        <NavLink to={"/account"}>
                            <div className="signup-container">
                                <button className="signUp-btn">
                                    Sign Up
                                </button>
                            </div>

                        </NavLink>
                    }





                </ul>




                <div className="input-Box-container">

                    <button className={`close-input-btn ${showInput ? "show-input" : ""}`} onClick={() => { setShowInput(false) }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <input type="text" className={`input-Box ${showInput ? "show-input" : ""}`} name="search" placeholder="Search Games" />

                    <div className="input-search">
                        <button className="search-btn" onClick={() => { setShowInput(true) }}>
                            <img src={searchIcon} alt="search-icon" />
                        </button>
                    </div>

                </div>

                <NavLink to={"/cart-page"}>
                    <div className='cart-container'>
                        <img src={cartIcon} alt="cart-icon" />
                        <span className='cart-counter'>{cartItems.length >= 1 ? totalItems : ""}</span>
                    </div>
                </NavLink>

                {/* <div className="input-box-mobile"> */}
                {/* <i className="fa-solid fa-search"></i> */}
                {/* <img src={searchIcon} alt="search-icon" /> */}
                {/* </div> */}

                <button className='nav-open-btn' onClick={() => { setMenu(true) }}>
                    <hr className='lined line1' />
                    <hr className='lined line2' />
                    <hr className='lined line3' />
                    <hr className='lined line4' />
                </button>
                {/* <div className="menu-icon" onClick={() => { setMenu(true) }}>
                    <i className="fa-solid fa-bars"></i>
                </div> */}



            </nav>


            {/* Navbar for mobile view */}

            <nav className={`navbar ${scroll ? "scrolled" : ""}`} id='navbar-mobile'>

                <NavLink to={"/cart-page"}>
                    <div className='cart-container'>
                        {/* <i className="fa-solid fa-cart-shopping"></i> */}
                        <img src={cartIcon} alt="cart-icon" />
                        <span className='cart-counter'>{cartItems.length >= 1 ? totalItems : ""}</span>
                    </div>
                </NavLink>

                <div className="logo-cont">
                    <NavLink to={"/"}><img src={mobileLogo} className="logo" id='mobile-logo' /></NavLink>

                </div>

                <div className="nav-open-cont">
                    <button className='nav-open-btn' onClick={() => { setMenu(true) }}>
                        <hr className='lined line1' />
                        <hr className='lined line2' />
                        <hr className='lined line3' />
                        <hr className='lined line4' />
                    </button>
                </div>


            </nav>


            {/* Mobile Menu */}
            <div className={`mobile-menu-overlay ${menu ? "show-overlay" : ""}`} onClick={() => { setMenu(false) }}></div>

            <div className={`mobile-menu-cont ${menu ? "show-menu-cont" : ""}`}>
                <div className="close-menu" onClick={() => { setMenu(false) }}>
                    <i className="fa-solid fa-xmark"></i>
                </div>

                <ul className="nav-links">
                    <NavLink to={"/"} className='Link2' ><li style={{ width: "fit-content" }}>Home</li></NavLink>
                    <NavLink to={"/about"} className='Link2' ><li style={{ width: "fit-content" }}>About</li></NavLink>
                    <NavLink to={"/collections"} className='Link2' ><li style={{ width: "fit-content" }}>Collection</li></NavLink>
                    <NavLink to={"/contact"} className='Link2' ><li style={{ width: "fit-content" }}>Contact</li></NavLink>
                    <NavLink to={"/privacy-policy"} className='Link2' ><li style={{ width: "fit-content" }}>Privacy Policy</li></NavLink>

                    <li className="drop-down">
                        <div onClick={openMenu} className='drop-title'>Category <span className={`${dropMenu ? "rotate-arrow " : ""}`}>▼</span></div>
                        {dropMenu && (
                            <ul className="drop-down-menu">
                                <li> <NavLink to={"/category/action"}  >Action</NavLink></li>
                                <li> <NavLink to={"/category/adventure"} >Adventure</NavLink></li>
                                <li> <NavLink to={"/category/open-world"} >Open World</NavLink></li>
                                <li> <NavLink to={"/category/racing"} >Racing</NavLink></li>
                                <li> <NavLink to={"/category/shooting"} >Shooting</NavLink></li>
                            </ul>
                        )}

                    </li>

                    <div className="input-Box-container-mobile">
                        <input type="text" className="input-Box-mobile" name="search" placeholder="Search Games" />
                        <button className="search-btn-mobile"><i className="fa-solid fa-search"></i></button>
                    </div>

                    {userData
                        ?
                        <div className="profile-Icon" style={{width:"40px", position:"absolute", top:"2rem", right:"2rem"}}>
                            {userData.name[0].toUpperCase()}

                            <div className="profile-list" style={{left:"-100px"}}>
                                <ul>
                                    {!userData.isAccountVerified && (<li onClick={sendVerificationOtp}><i className="fa-solid fa-envelope-circle-check"></i> Verify Email</li>)}

                                    <li onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</li>
                                </ul>
                            </div>
                        </div>

                        :
                        <NavLink to={"/account"}>
                            <div className="signup-container" style={{ display: "flex", justifyContent: "center" }}>
                                <button className="signUp-btn" style={{ width: "90%", position: "absolute", bottom: "2rem", padding: "9px" }}>
                                    Sign Up
                                </button>
                            </div>

                        </NavLink>
                    }



                </ul>

            </div>




        </div>
    )
}

