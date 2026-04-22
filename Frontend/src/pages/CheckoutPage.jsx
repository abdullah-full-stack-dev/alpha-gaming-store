import { useContext, useState } from "react";
import '../CSS/CheckoutPage.css'
import { CartContext } from "../Components/CartContext";

function CheckoutPage() {

  const { cartItems, totalPrice } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    alert("Order Placed Successfully 🎉");
    
  };

  return (
    <div className="checkout-page">

      {/* LEFT SIDE */}
      <div className="checkout-left">
        <h2>Billing Details</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="zip" placeholder="ZIP Code" onChange={handleChange} required />
      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">
        <h2>Your Order</h2>

        {cartItems.map(item => (
          <div key={item.id} className="summary-item">
            <p>{item.name} x {item.qty}</p>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        

        <h3>Total: ₹{totalPrice}</h3>

        <button className="place-order-btn" onClick={handleOrder}>
          Place Order
        </button>
      </div>

    </div>
  );
}

export default CheckoutPage;