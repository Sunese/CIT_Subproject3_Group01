import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../../utils/AuthContext";
import UserRatingClient from "../../api/userRatingClient";
import { useNotification } from "../../utils/NotificationContext";

function DeleteRating({ titleid, show, onHide }) {
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          onHide();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your rating?</p>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <Button
                className="mb-1"
                variant="secondary"
                onClick={() => {
                  onHide();
                }}
              >
                Cancel
              </Button>
              <Button
                className="mb-1"
                variant="danger"
                onClick={handleDeleteRating}
              >
                Delete
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteRating;
