import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { Rating } from "react-simple-star-rating";
import { Modal } from "react-bootstrap";
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

  const handleUpdateRating = async () => {
    try {
      const response = await UserRatingClient.updateUserRating(
        username,
        token,
        titleid,
        inputRating
      );
      console.log("update user rating response: ", response);
      if (response.status === 200) {
        showNotification("Rating updated successfully.", "success");
        onHide();
      }
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

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
        <Modal.Footer>
          {inputRating === null ? (
            <>
              <Button className="mb-1" variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button disabled>Submit</Button>
            </>
          ) : (
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
              <Button
                className="mb-1"
                variant="primary"
                onClick={handleUpdateRating}
              >
                Update Rating
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateRating;
