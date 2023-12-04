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

function Rate({ titleid, show, onHide }) {
  const [inputRating, setInputRating] = useState(null);
  const { isAuthenticated, token, username } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [error, setError] = useState(null);

  useEffect(() => {
    setInputRating(null);
  }, [show]);

  const handleCreateRating = async () => {
    setLoading(true);
    try {
      const response = await UserRatingClient.createUserRating(
        username,
        token,
        titleid,
        inputRating
      );
      console.log("create user rating response: ", response);
      if (response.status === 201) {
        showNotification("Rating created successfully.", "success");
        onHide();
      }
    } catch (error) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
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
          <Modal.Title>Rate title</Modal.Title>
        </Modal.Header>
        <Rating
          className="mb-3"
          onClick={(rating) => {
            setInputRating(rating);
          }}
          initialValue={inputRating}
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
              {loading ? (
                <Spinner />
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
                    onClick={handleCreateRating}
                  >
                    Submit
                  </Button>
                </>
              )}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Rate;
