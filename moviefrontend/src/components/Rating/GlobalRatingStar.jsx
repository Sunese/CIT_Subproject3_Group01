import React from "react";
import { FaStar } from "react-icons/fa";

const GlobalRatingStar = ({ rating }) => {
  return (
    <div className="global-rating-star">
      <FaStar className="title-rating-star"></FaStar>
      <span className="star-rating-text">{rating}</span>
    </div>
  );
};

export default GlobalRatingStar;
