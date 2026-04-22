import React, { useContext } from 'react'
import '../CSS/CategoryPage.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { allProducts } from '../assets/Data/allGamesDetails';
import { bannerData } from '../assets/Data/bannerData';
import { CartContext } from '../Components/CartContext';
// import { ToastContext } from '../Components/ToastContext';


export const CategoryPage = () => {

    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const { type } = useParams();

    const filteredGames = allProducts.filter(game =>
        game.genre.toLowerCase().includes(type)
    );

    const bannerDetail = bannerData[type];

    // const { showToast } = useContext(ToastContext);

    return (
        <div className='filtered-section'>



            <div className="category-content-banner">
                {/* <img src={bannerDetail.image} alt="banner" /> */}
                <video src={bannerDetail.video} loop autoPlay muted></video>
                <div className="category-content">
                    <h1>{type} Games</h1>
                    <p>
                        {bannerDetail.desc}
                    </p>
                </div>

            </div>

            <div className='container-card'>



                {/* {filtered-products} */}

                {filteredGames.map((game) => {
                    return (

                        <div key={game.id}  >
                            <div className="card"  >

                                <div className="image-container">

                                    <div className="image">
                                        <Link to={`/collections/${game.slug}`} key={game.slug}>
                                            <img src={game.image} alt="image" />
                                        </Link>

                                        <button className='addToCart' onClick={() => {addToCart(game);}} ><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
                                    </div>
                                </div>
                                <div className="name">
                                    <h2>{game.name}</h2>
                                </div>
                                <div className="genre">

                                    <p>{game.genre}</p>
                                </div>
                                <div className="rating">
                                    <h4> <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i> </h4>
                                    <h4 className='point'>{game.rating}</h4>
                                </div>

                                <div className="price-buyNow">
                                    <p><i className="fa-solid fa-indian-rupee-sign"></i>{game.price}</p>
                                    <button onClick={() =>{ addToCart(game); navigate("/checkout");}} >Buy Now</button>
                                </div>
                                <Link to={`/collections/${game.slug}`} key={game.slug}>
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
