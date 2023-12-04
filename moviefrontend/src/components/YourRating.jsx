import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import Rate from "./Rating/Rate";
import UserRatingClient from "../api/userRatingClient";
import Rating from "../data/rating/ratingData";
import UpdateRating from "./Rating/UpdateRating";
import DeleteRating from "./Rating/DeleteRating";
import { Link } from "react-router-dom";

const YourRating = ({ titleid }) => {
  const { isAuthenticated, token, username } = useAuth();
  const [showRate, setShowRate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUpdateRating, setShowUpdateRating] = useState(false);
  const [showDeleteRating, setShowDeleteRating] = useState(false);
  const [error, setError] = useState(null);
  const [storedRating, setStoredRating] = useState(null);
  const rating = 8.9;

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
        if (response.status === 200) {
          const rating = Rating.fromJson(await response.json());
          setStoredRating(rating);
        }
        if (response.status === 404) {
          setStoredRating(null);
        }
      } catch (error) {
        setError("Something went wrong.");
      }
    }
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [
    titleid,
    token,
    username,
    isAuthenticated,
    showRate,
    showUpdateRating,
    showDeleteRating,
  ]);

  if (!isAuthenticated) {
    return (
      <Link to="/signin" className="global-rating-text">
        Sign in to see your rating
      </Link>
    );
    // return <div className="global-rating-text">Sign in to see your rating</div>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>Your rating</div>
      {storedRating ? (
        <>
          <div style={{ display: "flex" }}>
            <FaStar className="user-rating-star" />
            {loading ? (
              <Spinner />
            ) : (
              <div className="your-rating-text">{storedRating.rating}/10</div>
            )}
          </div>
          <Button
            variant="outline-primary"
            className="user-rating-button"
            onClick={() => setShowUpdateRating(true)}
          >
            Update rating
          </Button>
          <Button
            variant="outline-danger"
            className="user-rating-button"
            onClick={() => setShowDeleteRating(true)}
          >
            Delete rating
          </Button>
        </>
      ) : (
        <div style={{ display: "flex" }}>
          <FaRegStar className="user-rating-star" />
          <Button
            variant="outline-primary"
            className="user-rating-button"
            onClick={() => setShowRate(true)}
          >
            Rate
          </Button>
        </div>
      )}
      <Rate
        titleid={titleid}
        show={showRate}
        onHide={() => {
          setShowRate(false);
        }}
      ></Rate>

      {storedRating && (
        <UpdateRating
          titleid={titleid}
          storedRating={storedRating}
          show={showUpdateRating}
          onHide={() => setShowUpdateRating(false)}
        ></UpdateRating>
      )}

      <DeleteRating
        titleid={titleid}
        show={showDeleteRating}
        onHide={() => {
          setShowDeleteRating(false);
        }}
      ></DeleteRating>
    </>
  );
};

export default YourRating;
