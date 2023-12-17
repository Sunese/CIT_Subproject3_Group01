import React, { useEffect } from "react";
import UserRatingClient from "../api/userRatingClient";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationContext";
import PagedData from "../data/pagedData";
import TitleBookmarkPageItemData from "../data/user/titleBookmarkPageItemData";
import TitleRatingPageItemData from "../data/title/titleRatingPageItemData";
import { Button, Spinner, Table } from "react-bootstrap";
import UserTitleRatingData from "../data/user/userTitleRatingData";
import UpdateRating from "../components/Rating/UpdateRating";
import Paginator from "../components/Paginator";

const Ratings = () => {
  const { isAuthenticated, username, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showUpdateFor, setShowUpdateFor] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isAuthenticated) {
          return;
        }
        setLoading(true);

        const response = await UserRatingClient.getUserRatings(
          username,
          token,
          page,
          pageSize
        );

        if (!response.ok) {
          throw new Error();
        }

        const json = await response.json();

        const ratings = PagedData.fromJson(json, UserTitleRatingData.fromJson);

        setRatings(ratings);
      } catch (error) {
        showNotification("Error loading ratings", "danger");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated, username, token, showUpdateFor, page, pageSize]);

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

  const MapRatings = () => {
    return ratings?.items.map((rating) => (
      <tr key={rating.titleID}>
        <td>
          <Link to={`/title/${rating.titleID}`}>
            {rating.title.primaryTitle}
          </Link>
        </td>
        <td>{rating.rating}</td>
        <td>{rating.timeStamp}</td>
        <td>
          <Button onClick={() => setShowUpdateFor(rating.titleID)}>
            Update
          </Button>
        </td>
        <UpdateRating
          titleid={rating.titleID}
          storedRating={rating}
          show={showUpdateFor === rating.titleID}
          onHide={() => {
            setShowUpdateFor(null);
          }}
        />
      </tr>
    ));
  };

  return (
    <>
      <h1>Your ratings</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>Timestamp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <MapRatings />
        </tbody>
      </Table>
      <Paginator
        pageCount={page}
        setPageCount={setPage}
        itemCount={pageSize}
        setItemCount={setPageSize}
        maxPageCount={ratings?.numberOfPages}
      />
    </>
  );
};

export default Ratings;
