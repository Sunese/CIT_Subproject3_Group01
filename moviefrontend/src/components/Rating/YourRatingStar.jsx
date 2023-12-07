import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const YourRatingStar = ({ text, filled, className, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const HoverableStar = ({ filled }) => {
    if (filled && isHovered) {
      return <FaRegStar />;
    } else if (filled && !isHovered) {
      return <FaStar />;
    } else if (!filled && isHovered) {
      return <FaStar />;
    } else if (!filled && !isHovered) {
      return <FaRegStar />;
    }
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <HoverableStar filled={filled}></HoverableStar>
      <span className="star-rating-text">{text}</span>
    </div>
  );
};

export default YourRatingStar;
