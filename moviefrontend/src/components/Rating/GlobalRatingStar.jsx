import React from "react";
import { FaStar } from "react-icons/fa";

const GlobalRatingStar = ({ rating }) => {
  return (
    <div className="global-rating-icon-container">
      <FaStar />
      <span>{rating}</span>
    </div>
  );
};

export default GlobalRatingStar;
