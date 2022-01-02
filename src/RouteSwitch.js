import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
      </Routes>
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
