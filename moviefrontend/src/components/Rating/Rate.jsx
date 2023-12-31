import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Rating } from "react-simple-star-rating";
import { Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../../utils/AuthContext";
import UserRatingClient from "../../api/userRatingClient";
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

  const ModalFooter = () => {
    if (inputRating === null) {
      return (
        <>
          <Button className="mb-1" variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button disabled>Submit</Button>
        </>
      );
    } else if (loading) {
      return <Spinner />;
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
          <Button
            className="mb-1"
            variant="primary"
            onClick={() => handleCreateRating()}
          >
            Submit
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
        <Modal.Footer>{ModalFooter()}</Modal.Footer>
      </Modal>
    </>
  );
}

export default Rate;
