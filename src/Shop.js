import React, { useEffect } from "react";
import { useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);

  // fetch Etsy api data once when component mounts and store in state
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const apikey = "vv3qn3iae48c08suyjn5vnvt";
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v3/application/listings/active?client_id=${apikey}&keywords=variegated_monstera`
    );

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      const listings = await data.results;
      setProducts(listings);
      console.log(listings);
    } else {
      console.log("oops");
    }
  };

  return (
    <div>
      <h2>Shop</h2>
      <div className="products">
        {products.map((product) => {
          return (
            <div
              id={product.listing_id}
              key={product.listing_id}
              className="listing"
            >
              <div className="title">{product.title}</div>
              <div className="price">
                ${product.price.amount / product.price.divisor}
              </div>
              <a className="url" href={product.url}>
                {product.url}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
