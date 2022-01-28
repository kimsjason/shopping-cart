import "../styles/Shop.css";
import { Link } from "react-router-dom";
import {
  ExpandMore,
  ExpandLess,
  FavoriteBorder,
  Favorite,
} from "@material-ui/icons";

const Shop = (props) => {
  const handleExpandSort = (e) => {
    const sort = e.target.parentElement;
    const sortBy = sort.querySelector(".sort-by");
    const expandMore = sort.querySelector(".expand-more");
    const expandLess = sort.querySelector(".expand-less ");

    sortBy.classList.toggle("hidden");
    expandMore.classList.toggle("hidden");
    expandLess.classList.toggle("hidden");
  };

  const onSortLowtoHigh = (e) => {
    props.onSortLowtoHigh(e);
  };

  const onSortHightoLow = (e) => {
    props.onSortHightoLow(e);
  };

  const onSortAtoZ = (e) => {
    props.onSortAtoZ(e);
  };

  const onSortZtoA = (e) => {
    props.onSortZtoA(e);
  };

  const handleHoverListing = (e) => {
    const listing = e.target.closest(".listing");
    const favorite = listing.querySelector(".favorite");
    favorite.classList.remove("hidden");
  };

  const handleHoverOutListing = (e) => {
    const listing = e.target.closest(".listing");
    const favorite = listing.querySelector(".favorite");
    favorite.classList.add("hidden");
  };

  const handleHoverFavorite = (e) => {
    const favorite = e.target;
    favorite.classList.remove("hidden");
    favorite.classList.add(".pink");
  };

  const onClickFavorite = (e) => {
    const listing = e.target.closest(".listing");
    const favorited = listing.querySelector(".favorited");
    favorited.classList.toggle("hidden");
    props.onClickFavorite(e);
  };

  const onUnclickFavorite = (e) => {
    const listing = e.target.closest(".listing");
    const favorited = listing.querySelector(".favorited");
    favorited.classList.toggle("hidden");
    props.onUnclickFavorite(e);
  };

  return (
    <div className="shop">
      <div className="sort">
        <div className="sort-header" onClick={handleExpandSort}>
          Sort
          <ExpandMore className="expand-more hidden" />
          <ExpandLess className="expand-less " />
        </div>
        <div className="sort-by hidden">
          <div className="low-to-high" onClick={onSortLowtoHigh}>
            <span>Lowest to Highest</span>
          </div>
          <div className="high-to-low" onClick={onSortHightoLow}>
            <span>Highest to Lowest</span>
          </div>
          <div className="a-z" onClick={onSortAtoZ}>
            <span>Alphabetically (A - Z)</span>
          </div>
          <div className="z-a" onClick={onSortZtoA}>
            <span>Alphabetically (Z - A)</span>
          </div>
        </div>
      </div>
      <div className="listings">
        {props.listings.map((listing) => {
          return (
            <div
              id={listing.listing_id}
              key={listing.listing_id}
              className="listing"
            >
              <Link
                to={`/shopping-cart/shop/${listing.listing_id}`}
                id={listing.listing_id}
                key={listing.listing_id}
              >
                <img
                  src={listing.Images[0].url_fullxfull}
                  alt=" "
                  onMouseOver={handleHoverListing}
                  onMouseOut={handleHoverOutListing}
                />
              </Link>

              <FavoriteBorder
                className="favorite hidden"
                onMouseOver={handleHoverFavorite}
                onClick={onClickFavorite}
              />
              <Favorite
                // className="favorited hidden"
                className={listing.favorite ? "favorited" : "favorited hidden"}
                onClick={onUnclickFavorite}
              />
              <div className="listing-content">
                <div className="title">{listing.title}</div>
                <div className="price">${listing.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
