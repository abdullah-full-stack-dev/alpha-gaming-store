import React, { useContext, useState } from 'react'
import '../CSS/AllProducts.css'

import { allProducts, newProducts } from '../assets/Data/allGamesDetails'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../Components/CartContext';
import { ToastContext } from '../Components/ToastContext';

export const AllProducts = () => {

    const navigate = useNavigate();

    const [visible, setVisible] = useState(10);

    const { addToCart } = useContext(CartContext);

    // const { showToast } = useContext(ToastContext);

    return (
        <div>
            <div className='container-card2'>


                {allProducts.slice(0, visible).map((item, index) => {
                    return (

                        <div key={index} >
                            <div className="card" >
                                <div className="image-container">

                                    <div className="image">
                                        <Link to={`/collections/${item.slug}`} key={item.slug}>
                                            <img src={item.image} alt="image" />
                                        </Link>
                                        <button className='addToCart' onClick={() => {addToCart(item);}} ><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
                                    </div>

                                </div>
                                <div className="name">
                                    <h2>{item.name}</h2>
                                </div>
                                <div className="genre">

                                    <p>{item.genre}</p>
                                </div>
                                <div className="rating">
                                    <h4> <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i> </h4>
                                    <h4 className='point'>{item.rating}</h4>
                                </div>

                                <div className="price-buyNow">
                                    <p><i className="fa-solid fa-indian-rupee-sign"></i>{item.price}</p>
                                    
                                    <button onClick={() =>{ addToCart(item); navigate("/checkout");}} >Buy Now</button>
                                  
                                </div>
                                <Link to={`/collections/${item.slug}`} key={item.slug}>
                                    <div className="viewDetail">
                                        <button>View Details</button>
                                    </div>
                                </Link>

                            </div>
                        </div>

                    )
                })}



            </div>

            {visible < allProducts.length && (
                <div className="moreBtn-cont">
                    <button onClick={() => setVisible(visible + 5)} className='more-btn'>
                        Show More
                    </button>
                </div>
            )}

            <hr className='divider' />

            <div className="collection-content" id='new-released'>
                <h1>New Released 2024 - 2025</h1>
                <p>
                    Discover the latest and most exciting PC game releases from 2024 to 2025. <br />
                    From blockbuster AAA titles to trending indie hits, explore fresh experiences, cutting-edge graphics, and next-gen gameplay designed for modern gamers.
                </p>
            </div>

            <div className='container-card2' >

                {/* {newProducts} */}

                {newProducts.map((item, index) => {
                    return (

                        <div key={index} >
                            <div className="card" >

                                <div className="image-container">

                                    <div className="image">
                                        <Link to={`/collections/${item.slug}`} key={item.slug}>
                                            <img src={item.image} alt="image" />
                                        </Link>
                                        <span className='tags'>New</span>
                                        <button className='addToCart' onClick={() => {addToCart(item);}} ><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
                                    </div>
                                </div>
                                <div className="name">
                                    <h2>{item.name}</h2>
                                </div>
                                <div className="genre">

                                    <p>{item.genre}</p>
                                </div>
                                <div className="rating">
                                    <h4> <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i> </h4>
                                    <h4 className='point'>{item.rating}</h4>
                                </div>

                                <div className="price-buyNow">
                                    <p><i className="fa-solid fa-indian-rupee-sign"></i>{item.price}</p>
                                    <button onClick={() =>{ addToCart(item); navigate("/checkout");}} >Buy Now</button>
                                </div>
                                <Link to={`/collections/${item.slug}`} key={item.slug}>
                                    <div className="viewDetail">
                                        <button>View Details</button>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}
