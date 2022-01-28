import { ReactComponent as MonsteraOne } from "../assets/monstera-1.svg";
import { ReactComponent as MonsteraTwo } from "../assets/monstera-2.svg";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="image-container">
          <MonsteraOne className="monstera-one" />
          <MonsteraTwo className="monstera-two" />
        </div>
        <div className="hero-content">
          <h1 className="main-logo">The Rare Plant Shop</h1>
          <div className="message"></div>
          <Link to="/shopping-cart/shop">
            <button className="shop-button">Start Browsing</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
