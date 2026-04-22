import { useContext } from "react";
import { CartContext } from "../Components/CartContext";
import '../CSS/Cart.css'
import deleteIcon from "../assets/images/delete.png";
import { Link } from "react-router-dom";

export function Cart() {

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalPrice
  } = useContext(CartContext);

  return (
    <div className="cart-page">

      <div className="cart-page-content">
        <h1>{cartItems.length < 1 ?
          <>
            Your Cart is Empty! <br />
            <Link to={"/collections"}>
              <button className="shopNowBtn"><i className="fa-solid fa-bag-shopping"></i> Shop Now</button>

            </Link>
          </>

          : "Shopping Cart"}</h1>


        {cartItems.map(item => (
          <div key={item.id} className="cart-item">

            <img src={item.image} width="100" className="item-image" />

            <h3>{item.name}</h3>
            <p><i className="fa-solid fa-indian-rupee-sign"></i>{item.price}</p>

            {/*  */}
            <div className="inc-dec-quantity">
              <span onClick={() => decreaseQty(item.id)}><i className="fa-solid fa-circle-minus"></i></span>
              <span className="item-qty">{item.qty}</span>
              <span onClick={() => increaseQty(item.id)}><i className="fa-solid fa-square-plus"></i></span>
            </div>

            {/*  */}
            <img src={deleteIcon} className="deleteIcon" onClick={() => removeItem(item.id)} />

          </div>
        ))}

        <div className="sub-total">
          <h2>Subtotal {`(${cartItems.length} items)`} : <i className="fa-solid fa-indian-rupee-sign"></i>{totalPrice}</h2>

          {cartItems.length >= 1 ? <button onClick={clearCart} className="clearCart">Clear Cart</button> : ""}
          
        </div>

        {cartItems.length >= 1 
        ? 
        <div className="estimate-total">
          <h2>Estimated Total: <i className="fa-solid fa-indian-rupee-sign"></i>{totalPrice}</h2>
          <Link to="/checkout">
            <button className="checkout">Proceed To Checkout</button>
          </Link>

        </div>
        :
        "" }
        

      </div>

    </div>
  );
}




