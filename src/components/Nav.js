import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

const Nav = (props) => {
  const handleToggleCart = () => {
    const shoppingCart = document.querySelector(".shopping-cart");
    shoppingCart.classList.toggle("hidden");
  };

  return (
    <nav>
      <div className="flex-wrapper">
        <Link to="/">
          <h2 className="logo">The Rare Plant Shop</h2>
        </Link>
        <ul className="nav-links">
          <Link to="/">
            <li className="home">Home</li>
          </Link>
          <Link to="/shop">
            <li className="Shop">Shop</li>
          </Link>
          <Link to="/wishlist">
            <li className="wishlist">Wishlist</li>
          </Link>
          <li className="cart" onClick={handleToggleCart}>
            <ShoppingCart />
            {props.cart.length > 0
              ? props.cart.reduce((prevValue, currValue) => {
                  return prevValue + currValue.quantity;
                }, 0)
              : ""}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
