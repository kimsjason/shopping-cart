import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  const handleClick = () => {
    const shoppingCart = document.querySelector(".shopping-cart");
    shoppingCart.classList.toggle("hidden");
    console.log(shoppingCart);
  };

  return (
    <nav>
      <h2 className="logo">The Rare Plant Shop</h2>
      <ul className="nav-links">
        <Link to="/">
          <li className="home">Home</li>
        </Link>
        <Link to="/shop">
          <li className="Shop">Shop</li>
        </Link>
        <li className="cart" onClick={handleClick}>
          Shopping Cart
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
