import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ListingDetails from "./components/ListingDetails";
import ShoppingCart from "./components/ShoppingCart";
import "./styles/RouteSwitch.css";

const RouteSwitch = () => {
  const [cart, setCart] = useState([]);
  const [listings, setListings] = useState([]);

  // fetch Etsy api data once when component mounts and store in state
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const apikey = "vv3qn3iae48c08suyjn5vnvt";
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?api_key=${apikey}&keywords=variegated_monstera&min_price=100&includes=Images`
    );

    if (response.ok) {
      const data = await response.json();
      const listings = await data.results;
      console.log(listings);
      setListings(listings);
    } else {
      console.log("oops");
    }
  };

  const handleAddItem = (e) => {
    const listingID = parseInt(e.target.closest(".listing").id);
    const [listing] = listings.filter(
      (listing) => listing.listing_id === listingID
    );

    const updatedCart = () => {
      // if cart empty, add first item
      if (cart.length === 0) {
        return [
          {
            id: listing.listing_id,
            title: listing.title,
            price: listing.price,
            quantity: 1,
            images: listing.Images,
          },
        ];
      }
      // if existing item in cart, add +1 quantity
      else if (cart.some((item) => item.title === listing.title)) {
        return cart.map((item) => {
          if (item.title === listing.title) {
            return {
              id: listing.listing_id,
              title: listing.title,
              price: listing.price,
              quantity: parseInt(item.quantity) + 1,
              images: listing.Images,
            };
          }
          return item;
        });
      }
      // if items in cart, add new item
      else {
        return [
          ...cart,
          {
            id: listing.listing_id,
            title: listing.title,
            price: listing.price,
            quantity: 1,
            images: listing.Images,
          },
        ];
      }
    };
    setCart(updatedCart);
  };

  const handleSubtractItemQuantity = (e) => {
    const listingID = parseInt(e.target.closest(".item").id);
    const [listing] = cart.filter((listing) => listing.id === listingID);

    const updatedCart = () => {
      if (listing.quantity === 1) {
        return cart.filter((item) => {
          if (item.title === listing.title) {
            return undefined;
          } else {
            return item;
          }
        });
      }
      return cart.map((item) => {
        if (item.title === listing.title) {
          return {
            id: listing.id,
            title: listing.title,
            price: listing.price,
            quantity: parseInt(item.quantity) - 1,
            images: listing.images,
          };
        }
        return item;
      });
    };

    setCart(updatedCart);

    // remove item if zero quantity --> create separate function; use function also for trash icon for cart items
  };

  const handleAddItemQuantity = (e) => {
    const listingID = parseInt(e.target.closest(".item").id);
    const [listing] = cart.filter((listing) => listing.id === listingID);

    const updatedCart = () => {
      return cart.map((item) => {
        if (item.title === listing.title) {
          return {
            id: listing.id,
            title: listing.title,
            price: listing.price,
            quantity: parseInt(item.quantity) + 1,
            images: listing.images,
          };
        }
        return item;
      });
    };

    setCart(updatedCart);
  };

  const handleUpdateQuantity = (e) => {
    const listingID = parseInt(e.target.closest(".item").id);
    const [listing] = cart.filter((listing) => listing.id === listingID);
    const quantity = e.target.value;

    const updatedCart = () => {
      return cart.map((item) => {
        if (item.title === listing.title) {
          return {
            id: listing.id,
            title: listing.title,
            price: listing.price,
            quantity: parseInt(quantity),
            images: listing.images,
          };
        }
        return item;
      });
    };

    setCart(updatedCart);
  };

  return (
    <BrowserRouter>
      <div className="main">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={<Shop onAddItem={handleAddItem} listings={listings} />}
          />
          <Route
            path="/shop/:listing_id"
            element={<ListingDetails onAddItem={handleAddItem} />}
          />
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
