import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import Rate from "./Rate";
import UserRatingClient from "../../api/userRatingClient";
import Rating from "../../data/rating/ratingData";
import UpdateRating from "./UpdateRating";
import DeleteRating from "./DeleteRating";
import { Link } from "react-router-dom";
import { useNotification } from "../../utils/NotificationContext";
import YourRatingStar from "./YourRatingStar";

const YourRating = ({ titleid }) => {
  const { isAuthenticated, token, username } = useAuth();
  const [showRate, setShowRate] = useState(false);
  const [loadingRating, setLoadingRating] = useState(false);
  const [showUpdateRating, setShowUpdateRating] = useState(false);
  const [storedRating, setStoredRating] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const response = await UserRatingClient.getUserRating(
          username,
          token,
          titleid
        );
        console.log("response: ", response);
        if (response.status === 200) {
          const rating = Rating.fromJson(await response.json());
          console.log("rating: ", rating);
          setStoredRating(rating);
        }
        if (response.status === 404) {
          setStoredRating(null);
        }
      } catch (error) {
        showNotification("Could not retreive your rating", "danger");
      }
    }
    setLoadingRating(true);
    fetchData();
    setLoadingRating(false);
  }, [titleid, token, username, isAuthenticated, showRate, showUpdateRating]);

  if (!isAuthenticated) {
    return <Link to="/signin">Sign in to see your rating</Link>;
  }

  if (loadingRating) {
    return <Spinner />;
  }

  if (storedRating) {
    return (
      <>
        <YourRatingStar
          filled={true}
          text={storedRating.rating}
          className={"userrating-icon-container"}
          onClick={() => setShowUpdateRating(true)}
        />
        <UpdateRating
          titleid={titleid}
          storedRating={storedRating}
          show={showUpdateRating}
          onHide={() => {
            setShowUpdateRating(false);
          }}
        />
      </>
    );
  }

  return (
    <>
      <YourRatingStar
        filled={false}
        text={""}
        className={"userrating-icon-container"}
        onClick={() => setShowRate(true)}
      />
      <Rate
        titleid={titleid}
        show={showRate}
        onHide={() => {
          setShowRate(false);
        }}
      ></Rate>
    </>
  );
};

export default YourRating;
