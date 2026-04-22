import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { allProducts } from '../assets/Data/allGamesDetails';
import '../CSS/GameDetails.css'
import { CartContext } from '../Components/CartContext';


export const GameDetails = () => {

    const [showModal, setShowModal] = useState(false);

    // convert youtube link to embed
    const getEmbedUrl = (url) => {
        return url.replace("watch?v=", "embed/");
    };

    const { slug } = useParams();

    const game = allProducts.find((item) => item.slug == slug);

    if (!game) {
        return <h2>Game Not Found</h2>;
    }

    const { addToCart } = useContext(CartContext);

    return (
        <div className='game-details-section'>
            <div className="upper-content">
                <div className="image">
                    <img src={game.image} />
                </div>
                <div className="details">
                    <h1 className='name'>{game.name}</h1>
                    <p className='genre'>{game.genre}</p>
                    <h3 className='makers'>Developer : {game.developer}</h3>
                    <h3 className='makers'>Publisher : {game.publisher}</h3>
                    <h3 className='platform'>Platforms : {game.platforms}</h3>
                    <h4 className='ratings'><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i> {game.rating}</h4>
                    <p className='product-price'><i className="fa-solid fa-indian-rupee-sign"></i>{game.price}</p>
                    <button className='addToCartBtn' onClick={() => {addToCart(game); }}><i className="fa-solid fa-cart-plus"></i> Add To Cart</button><br />
                    <Link to={"/checkout"} ><button className='buyNowBtn' onClick={() => {addToCart(game)}}><i className="fa-solid fa-bag-shopping"></i> Buy Now</button></Link>

                    <br />
                    {/* Watch Trailer Button */}
                    <button className="trailer-btn" onClick={() => setShowModal(true)}>
                        ▶ Watch Trailer
                    </button>

                    {/* Modal */}
                    {showModal && (
                        <div className="modal-overlay" onClick={() => setShowModal(false)}>

                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                                {/* Close Button */}
                                <span className="close-btn" onClick={() => setShowModal(false)}><i class="fa-solid fa-xmark" title='close'></i></span>

                                {/* Video */}
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={getEmbedUrl(game.trailer)}
                                    title="Game Trailer"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>

                            </div>

                        </div>
                    )}
                    <p className='warning'><i className="fa-solid fa-triangle-exclamation"></i> Important: Check system requirements for PC before purchase.<br /> We are not responsible for compatibility issues.</p>
                </div>

            </div>

            <div className="lower-content">
                <div className="game-description">
                    <h2>Description</h2>
                    <p>{game.description}</p>
                </div>

                <div className="requirements">
                    <h2>System Requirements</h2>
                    <p>{game.requirements}</p>
                </div>

            </div>

            <div className="heading-container">
                <span className='heading'>ScreenShots</span>
            </div>
            <div className="screenshots-container">

                <div className="screenshots">
                    <img src={game.screenshots[0]} alt="screenshots" />
                </div>
                <div className="screenshots">
                    <img src={game.screenshots[1]} alt="screenshots" />
                </div>
            </div>



        </div>
    )
}
