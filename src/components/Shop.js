import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/Shop.css";

const Shop = () => {
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
      setListings(listings);
    } else {
      console.log("oops");
    }
  };

  return (
    <div>
      <div className="listings">
        {listings.map((listing) => {
          return (
            <div
              id={listing.listing_id}
              key={listing.listing_id}
              className="listing"
            >
              <img src={listing.Images[0].url_fullxfull} alt=" " />
              <div className="listing-content">
                <div className="title">{listing.title}</div>
                <div className="price">${listing.price}</div>
                <a className="url" href={listing.url}>
                  Link
                </a>
                <a href="#">Add to Cart</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
