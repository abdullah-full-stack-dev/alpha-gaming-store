import { createContext, useState, useEffect, useContext } from "react";
// import { ToastContext } from "./ToastContext";
import { toast } from 'react-toastify';

export const CartContext = createContext();

export function CartProvider({ children }) {

  // const { showToast } = useContext(ToastContext);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  //  save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART (with quantity)
  const addToCart = (product) => {

    const exists = cartItems.find(item => item.id === product.id);

    if (exists) {

      const updated = cartItems.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item

      );

      setCartItems(updated);
      toast.info("Item already in Cart!")


    } else {

      setCartItems([...cartItems, { ...product, qty: 1 }]);
      // showToast(<><i className="fa-solid fa-cart-shopping"></i> Item Added To Cart!</>)
      toast.success("Item Added To Cart!")
    }
  };

  //  increase method 1
  const increaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  //  increase method 2
  // const increaseQty = (id) => {
  //   const updated = cartItems.map(item => {
  //     if (item.id === id) {
  //       return { ...item, qty: item.qty + 1 };
  //     }
  //     return item;
  //   });

  //   setCartItems(updated);
  // };

  //  decrease
  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  //  remove
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };



  //  clear
  const clearCart = () => {
    setCartItems([]);
  };

  //  total
  let totalPrice = 0;

  cartItems.forEach(item => {
    totalPrice += item.price * item.qty;
  });

  return (
    <div>

      <CartContext.Provider value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        totalPrice
      }}>
        {children}
      </CartContext.Provider>
    </div>


  );
}