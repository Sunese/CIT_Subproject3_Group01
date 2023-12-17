import React from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNotification } from "../../utils/NotificationContext";
import BookmarkClient from "../../api/bookmarkClient";

const AddBookmark = ({ id, bookmarkType, show, onHide }) => {
  const [inputNote, setInputNote] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addNameBookmark = async () => {
    try {
      const response = await BookmarkClient.addNameBookmark(
        token,
        username,
        id,
        inputNote
      );
      if (response.status === 201) {
        showNotification("Bookmark added", "success");
      } else {
        showNotification("Could not add bookmark", "danger");
      }
    } catch (error) {
      showNotification("Could not add bookmark", "danger");
    }
  };

  const addTitleBookmark = async () => {
    try {
      const response = await BookmarkClient.addTitleBookmark(
        token,
        username,
        id,
        inputNote
      );
      if (response.status === 201) {
        showNotification("Bookmark added", "success");
      } else {
        showNotification("Could not add bookmark", "danger");
      }
    } catch (error) {
      showNotification("Could not add bookmark", "danger");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputNote(value);
    var regex = new RegExp("^[a-zA-Z0-9,. ']*$");
    const isValidInput = regex.test(value);
    setIsValid(isValidInput);
  };

  const handleAddBookmark = async () => {
    setLoading(true);
    switch (bookmarkType) {
      case "title":
        await addTitleBookmark();
        break;
      case "name":
        await addNameBookmark();
        break;
      default:
        break;
    }
    setLoading(false);
    onHide();
  };

  const modalButtons = () => {
    if (loading) {
      return <Spinner animation="border" />;
    }
    return (
      <>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={!isValid}
          onClick={() => handleAddBookmark()}
        >
          Add Bookmark
        </Button>
      </>
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update {bookmarkType} Bookmark</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type="text"
              value={inputNote}
              placeholder="Enter notes"
              onChange={(e) => handleInputChange(e)}
              isInvalid={!isValid}
            />
            <Form.Control.Feedback type="invalid">
              Encountered invalid characters.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>{modalButtons()}</Modal.Footer>
    </Modal>
  );
};

export default AddBookmark;
