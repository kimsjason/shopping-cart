import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ShoppingCart from "./components/ShoppingCart";
import "./styles/RouteSwitch.css";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <div className="main">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
        </Routes>
      </div>
      <ShoppingCart />
    </BrowserRouter>
  );
};

const Test = () => {
  return (
    <div>
      <h1>test</h1>
    </div>
  );
};
export default RouteSwitch;
