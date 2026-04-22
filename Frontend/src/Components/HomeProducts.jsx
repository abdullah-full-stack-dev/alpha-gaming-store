import React, {useContext} from 'react'
import '../CSS/HomeProducts.css'
import { homeProducts } from '../assets/Data/allGamesDetails';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../Components/CartContext';
import { ToastContext } from './ToastContext';

export const HomeProducts = () => {

    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    return (

        <div>

            <div className="heading-cont">
                <span className="heading head" id='head'>Trending Games</span>
            </div>

            <div className='container-card'>


                {homeProducts.map((item, index) => {
                    return (


                        <div key={index} >
                            <div className="card" >
                                <div className="image-container">

                                    <div className="image">
                                        <Link to={`/collections/${item.slug}`} key={item.slug}>
                                            <img src={item.image} alt="image" />
                                        </Link>
                                        <span className='tags'>Trending</span>
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
