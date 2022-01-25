import "../styles/Shop.css";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

const Shop = (props) => {
  const onAddItem = (e) => {
    props.onAddItem(e);
  };

  return (
    <div>
      <div className="sort" onClick={() => {}}>
        <div className="sort-header">
          <div>Sort</div>
          <ExpandMore />
        </div>
        <div className="sort-by">
          <div className="low-to-high">Lowest to Highest</div>
          <div className="high-to-low">Highest to Lowest</div>
        </div>
      </div>
      <div className="listings">
        {props.listings.map((listing) => {
          return (
            <Link
              to={`/shop/${listing.listing_id}`}
              id={listing.listing_id}
              key={listing.listing_id}
            >
              <div
                id={listing.listing_id}
                key={listing.listing_id}
                className="listing"
              >
                <img src={listing.Images[0].url_fullxfull} alt=" " />
                <div className="listing-content">
                  <div className="title">{listing.title}</div>
                  <div className="price">${listing.price}</div>
                  <div className="add-to-cart" onClick={onAddItem}>
                    Add to Cart
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
