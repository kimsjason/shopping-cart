import { useState } from "react";
import "../styles/ShoppingCart.css";

const ShoppingCart = () => {
  const [cart, setCart] = useState({});

  return (
    <div className="shopping-cart hidden">
      <div className="checkout">Checkout</div>
    </div>
  );
};

export default ShoppingCart;
