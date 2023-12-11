import React, { useEffect } from "react";
import UserRatingClient from "../api/userRatingClient";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationContext";
import PagedData from "../data/pagedData";
import TitleBookmarkPageItemData from "../data/user/titleBookmarkPageItemData";
import TitleRatingPageItemData from "../data/title/titleRatingPageItemData";
import { Button, Spinner } from "react-bootstrap";
import UserTitleRatingData from "../data/user/userTitleRatingData";
import UpdateRating from "../components/Rating/UpdateRating";

const Ratings = () => {
  const { isAuthenticated, username, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showUpdateFor, setShowUpdateFor] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isAuthenticated) {
          return;
        }
        setLoading(true);

        const response = await UserRatingClient.getUserRatings(username, token);

        if (!response.ok) {
          console.log("bad response: ", response);
          throw new Error();
        }

        const json = await response.json();
        console.log("json: ", json);

        const ratings = PagedData.fromJson(json, UserTitleRatingData.fromJson);

        setRatings(ratings);
      } catch (error) {
        console.error("error: ", error);
        showNotification("Error loading ratings", "danger");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated, username, token, showUpdateFor]);

  if (!isAuthenticated) {
    showNotification("Sign in to see your ratings", "warning");
    navigate("/signin");
    return <></>;
  }

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <div>Error loading ratings</div>;
  }

  return (
    <>
      <ul>
        {ratings?.items.map((rating) => (
          <li key={rating.titleID}>
            <Link to={`/title/${rating.titleID}`}>
              {rating.title.primaryTitle}
            </Link>
            <br />
            {rating.rating}
            <br />
            {rating.timeStamp}
            <Button onClick={() => setShowUpdateFor(rating.titleID)}>
              Update
            </Button>
            <UpdateRating
              titleid={rating.titleID}
              storedRating={rating}
              show={showUpdateFor === rating.titleID}
              onHide={() => {
                setShowUpdateFor(null);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Ratings;
