import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/ListingDetails.css";

const ListingDetails = (props) => {
  const [listingDetails, setListingDetails] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    Images: [{ url_fullxfull: "" }],
  });
  const [imageIndices, setImagesIndices] = useState({
    mainImage: 0,
    otherImageOne: 1,
    otherImageTwo: 2,
    otherImageThree: 3,
  });

  const params = useParams();

  // fetch Etsy api data once when component mounts and store in state
  useEffect(() => {
    fetchListingDetails();
  }, []);

  const fetchListingDetails = async () => {
    const apikey = "vv3qn3iae48c08suyjn5vnvt";
    const listing_id = params.listing_id;
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/${listing_id}?api_key=${apikey}&includes=Images`
    );

    if (response.ok) {
      const data = await response.json();
      const [listingDetails] = await data.results;
      setListingDetails(listingDetails);
    } else {
      console.log("oops");
    }
  };

  const onAddItem = (e) => {
    props.onAddItem(e);
  };

  const handlePrevious = () => {
    const maxIndex = listingDetails.Images.length - 1;

    // decrement image indices state if more than 0, otherwise set to max index
    if (imageIndices.mainImage === 0) {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.mainImage = maxIndex;
        return indices;
      });
    } else {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.mainImage--;
        return indices;
      });
    }

    if (imageIndices.otherImageOne === 0) {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageOne = maxIndex;
        return indices;
      });
    } else {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageOne--;
        return indices;
      });
    }

    if (imageIndices.otherImageTwo === 0) {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageTwo = maxIndex;
        return indices;
      });
    } else {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageTwo--;
        return indices;
      });
    }

    if (imageIndices.otherImageThree === 0) {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageThree = maxIndex;
        return indices;
      });
    } else {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageThree--;
        return indices;
      });
    }
  };

  const handleNext = () => {
    const maxIndex = listingDetails.Images.length - 1;

    // increment image indices state if less than max index, otherwise set to 0
    if (imageIndices.mainImage === maxIndex) {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.mainImage = 0;
        return indices;
      });
    } else {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.mainImage++;
        return indices;
      });
    }

    if (imageIndices.otherImageOne === maxIndex) {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageOne = 0;
        return indices;
      });
    } else {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageOne++;
        return indices;
      });
    }

    if (imageIndices.otherImageTwo === maxIndex) {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageTwo = 0;
        return indices;
      });
    } else {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageTwo++;
        return indices;
      });
    }

    if (imageIndices.otherImageThree === maxIndex) {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageThree = 0;
        return indices;
      });
    } else {
      setImagesIndices((prevState) => {
        let indices = { ...prevState };
        indices.otherImageThree++;
        return indices;
      });
    }
  };

  return (
    <div id={params.listing_id} className="listing listing-details">
      <div className="images">
        <div className="main-image-container">
          <input
            type="button"
            className="previous"
            value="<-"
            onClick={handlePrevious}
          />
          <img
            className="main-image"
            src={
              listingDetails.Images[imageIndices.mainImage]
                ? listingDetails.Images[imageIndices.mainImage].url_fullxfull
                : ""
            }
            alt="main-plant"
          />
          <input
            type="button"
            className="next"
            value="->"
            onClick={handleNext}
          />
        </div>
        <div className="other-images-container">
          <img
            className="other-image"
            src={
              listingDetails.Images[imageIndices.otherImageOne]
                ? listingDetails.Images[imageIndices.otherImageOne]
                    .url_fullxfull
                : ""
            }
            alt="other"
          />
          <img
            className="other-image"
            src={
              listingDetails.Images[imageIndices.otherImageTwo]
                ? listingDetails.Images[imageIndices.otherImageTwo]
                    .url_fullxfull
                : ""
            }
            alt="other"
          />
          <img
            className="other-image"
            src={
              listingDetails.Images[imageIndices.otherImageThree]
                ? listingDetails.Images[imageIndices.otherImageThree]
                    .url_fullxfull
                : ""
            }
            alt="other"
          />
        </div>
      </div>
      <div className="content">
        <h2 className="title">{listingDetails.title}</h2>
        <h3 className="price">${listingDetails.price}</h3>
        <div className="description">{listingDetails.description}</div>
        <button className="add-to-cart" onClick={onAddItem}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ListingDetails;
