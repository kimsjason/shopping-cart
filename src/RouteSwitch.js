import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ShoppingCart from "./components/ShoppingCart";
import "./styles/RouteSwitch.css";

const RouteSwitch = () => {
  const [cart, setCart] = useState([]);

  const handleAddItem = (e) => {
    const listingContent = e.target.parentElement;
    const image = listingContent.previousSibling.src;
    const title = listingContent.querySelector(".title").textContent;
    const price = listingContent.querySelector(".price").textContent.slice(1);

    const updatedCart = () => {
      // if cart empty, add first item
      if (cart.length === 0) {
        return [{ title: title, price: price, quantity: 1, image: image }];
      }
      // add quantity to existing cart item
      else if (cart.some((item) => item.title === title)) {
        return cart.map((item) => {
          if (item.title === title) {
            return {
              title: item.title,
              price: item.price,
              quantity: parseInt(item.quantity) + 1,
              image: image,
            };
          }
          return item;
        });
      }
      // add new item
      else {
        return [
          ...cart,
          { title: title, price: price, quantity: 1, image: image },
        ];
      }
    };
    setCart(updatedCart);
  };

  const handleSubtractItemQuantity = (e) => {
    const item = e.target.parentElement.parentElement;
    const image = item.previousSibling.src;
    const title = item.querySelector(".title").textContent;
    const currentQuantity = item.querySelector(".current-quantity").value;
    console.log(currentQuantity);
    const updatedCart = () => {
      if (currentQuantity == 1) {
        return cart.filter((item) => {
          if (item.title === title) {
            return undefined;
          } else {
            return item;
          }
        });
      }
      return cart.map((item) => {
        if (item.title === title) {
          return {
            title: item.title,
            price: item.price,
            quantity: parseInt(item.quantity) - 1,
            image: image,
          };
        }
        return item;
      });
    };

    setCart(updatedCart);

    // remove item if zero quantity --> create separate function; use function also for trash icon for cart items
  };

  const handleAddItemQuantity = (e) => {
    const item = e.target.parentElement.parentElement;
    const image = item.previousSibling.src;
    const title = item.querySelector(".title").textContent;

    const updatedCart = () => {
      return cart.map((item) => {
        if (item.title === title) {
          return {
            title: item.title,
            price: item.price,
            quantity: parseInt(item.quantity) + 1,
            image: image,
          };
        }
        return item;
      });
    };

    setCart(updatedCart);
  };

  const handleUpdateQuantity = (e) => {
    const item = e.target.parentElement.parentElement;
    const image = item.previousSibling.src;
    const title = item.querySelector(".title").textContent;
    const quantity = e.target.value;

    const updatedCart = () => {
      return cart.map((item) => {
        if (item.title === title) {
          return {
            title: item.title,
            price: item.price,
            quantity: parseInt(quantity),
            image: image,
          };
        }
        return item;
      });
    };

    setCart(updatedCart);
    console.log("updating");
  };

  return (
    <BrowserRouter>
      <div className="main">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/shop"
            element={<Shop onAddItem={handleAddItem} />}
          ></Route>
        </Routes>
      </div>
      <ShoppingCart
        cart={cart}
        onSubtractItemQuantity={handleSubtractItemQuantity}
        onAddItemQuantity={handleAddItemQuantity}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </BrowserRouter>
  );
};

export default RouteSwitch;
