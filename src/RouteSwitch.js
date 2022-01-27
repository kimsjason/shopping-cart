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
  const [wishlist, setWishlist] = useState([]);

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

  const handleRemoveItem = (e) => {
    const listingID = parseInt(e.target.closest(".item").id);
    const [listing] = listings.filter(
      (listing) => listing.listing_id === listingID
    );

    const updatedCart = () => {
      return cart.filter((item) => {
        if (item.title === listing.title) {
          return undefined;
        } else {
          return item;
        }
      });
    };

    setCart(updatedCart);
  };

  const handleSortLowtoHigh = () => {
    const listingsCopy = [...listings];
    const compare = (a, b) => {
      a = parseInt(a.price);
      b = parseInt(b.price);
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    };
    const sortedListings = listingsCopy.sort(compare);
    setListings(sortedListings);
  };

  const handleSortHightoLow = () => {
    const listingsCopy = [...listings];
    const compare = (a, b) => {
      a = parseInt(a.price);
      b = parseInt(b.price);
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    };
    const sortedListings = listingsCopy.sort(compare);
    setListings(sortedListings);
  };

  const handleSortAtoZ = () => {
    const listingsCopy = [...listings];
    const compare = (a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    };
    const sortedListings = listingsCopy.sort(compare);
    setListings(sortedListings);
  };

  const handleSortZtoA = () => {
    const listingsCopy = [...listings];
    const compare = (a, b) => {
      if (a.title > b.title) {
        return -1;
      }
      if (a.title < b.title) {
        return 1;
      }
      return 0;
    };
    const sortedListings = listingsCopy.sort(compare);
    setListings(sortedListings);
  };

  const handleClickFavorite = (e) => {
    const listingID = parseInt(e.target.closest(".listing").id);
    const [listing] = listings.filter(
      (listing) => listing.listing_id === listingID
    );

    const wishlistCopy = [...wishlist];
    wishlistCopy.push(listing);

    setWishlist(wishlistCopy);
    console.log(wishlist);
  };

  const handleUnclickFavorite = (e) => {
    const listingID = parseInt(e.target.closest(".listing").id);

    const updatedWishlist = () => {
      return wishlist.filter((item) => {
        return item.listing_id !== listingID;
      });
    };

    setWishlist(updatedWishlist);
  };

  return (
    <BrowserRouter>
      <div className="main">
        <Nav cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={
              <Shop
                listings={listings}
                onSortLowtoHigh={handleSortLowtoHigh}
                onSortHightoLow={handleSortHightoLow}
                onSortAtoZ={handleSortAtoZ}
                onSortZtoA={handleSortZtoA}
                onClickFavorite={handleClickFavorite}
                onUnclickFavorite={handleUnclickFavorite}
              />
            }
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
        onRemoveItem={handleRemoveItem}
      />
    </BrowserRouter>
  );
};

export default RouteSwitch;
