import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { Rating } from "react-simple-star-rating";
import { Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../../utils/AuthContext";
import AccountClient from "../../api/accountClient";
import UserRatingClient from "../../api/userRatingClient";
import RatingData from "../../data/rating/ratingData";
import { useNotification } from "../../utils/NotificationContext";

function UpdateRating({ titleid, show, storedRating, onHide }) {
  const [inputRating, setInputRating] = useState(null);
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    showNotification(error, "danger");
    onHide();
  };

  const handleUpdateRating = async () => {
    setLoading(true);
    try {
      const response = await UserRatingClient.updateUserRating(
        username,
        token,
        titleid,
        inputRating
      );
      if (response.status === 200) {
        showNotification("Rating updated successfully.", "success");
        onHide();
      } else {
        handleError("Could not update rating. Try again");
      }
    } catch (error) {
      handleError("Could not update rating. Try again");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRating = async () => {
    setLoading(true);
    try {
      const response = await UserRatingClient.deleteUserRating(
        username,
        token,
        titleid
      );
      if (response.status === 200) {
        showNotification("Rating deleted successfully.", "success");
        onHide();
      } else {
        onHide();
        showNotification("Could not delete rating. Try again", "danger");
      }
    } catch (error) {
      onHide();
      showNotification("Could not delete rating. Try again", "danger");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const modalButtons = () => {
    if (loading) {
      return <Spinner />;
    }
    if (inputRating === null) {
      return (
        <>
          <Button className="mb-1" variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteRating()}>
            Remove rating
          </Button>
          <Button disabled>Update rating</Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            className="mb-1"
            variant="secondary"
            onClick={() => {
              setInputRating(null);
              onHide();
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteRating()}>
            Remove rating
          </Button>
          <Button
            className="mb-1"
            variant="primary"
            onClick={() => handleUpdateRating()}
          >
            Update Rating
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setInputRating(null);
          onHide();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update rating</Modal.Title>
        </Modal.Header>
        <Rating
          className="mb-3"
          onClick={(rating) => {
            setInputRating(rating);
          }}
          initialValue={storedRating.rating}
          iconsCount={10}
          style={{ marginLeft: 40 }}
        />
        <Modal.Footer>{modalButtons()}</Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateRating;
