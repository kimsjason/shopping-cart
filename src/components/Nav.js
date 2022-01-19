import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
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
          <li className="cart" onClick={handleToggleCart}>
            Shopping Cart
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
