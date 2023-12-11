import React from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNotification } from "../../utils/NotificationContext";
import BookmarkClient from "../../api/bookmarkClient";

const UpdateBookmark = ({ id, bookmarkType, show, storedNote, onHide }) => {
  const [inputNote, setInputNote] = useState(null);
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateTitleBookmarkNote = async () => {
    try {
      const response = await BookmarkClient.updateTitleBookmarkNote(
        token,
        username,
        id,
        inputNote
      );
      if (response.status === 200) {
        showNotification("Note updated", "success");
      } else {
        showNotification("Could not update note", "danger");
      }
    } catch (error) {
      showNotification("Could not update note", "danger");
    }
  };

  const updateNameBookmarkNote = async () => {
    try {
      const response = await BookmarkClient.updateNameBookmarkNote(
        token,
        username,
        id,
        inputNote
      );
      if (response.status === 200) {
        showNotification("Note updated", "success");
      } else {
        showNotification("Could not update note", "danger");
      }
    } catch (error) {
      showNotification("Could not update note", "danger");
    }
  };

  const handleUpdateNote = async () => {
    setLoading(true);
    switch (bookmarkType) {
      case "title":
        await updateTitleBookmarkNote();
        break;
      case "name":
        await updateNameBookmarkNote();
        break;
      default:
        break;
    }
    setLoading(false);
    onHide();
  };

  const deleteTitleBookmark = async () => {
    try {
      const response = await BookmarkClient.removeTitleBookmark(
        token,
        username,
        id
      );
      if (response.status === 200) {
        showNotification("Bookmark removed", "success");
      } else {
        showNotification("Could not remove bookmark", "danger");
      }
    } catch (error) {
      showNotification("Could not remove bookmark", "danger");
    }
  };

  const deleteNameBookmark = async () => {
    try {
      const response = await BookmarkClient.removeNameBookmark(
        token,
        username,
        id
      );
      if (response.status === 200) {
        showNotification("Bookmark removed", "success");
      } else {
        showNotification("Could not remove bookmark", "danger");
      }
    } catch (error) {
      showNotification("Could not remove bookmark", "danger");
    }
  };

  const handleDeleteBookmark = async () => {
    setLoading(true);
    switch (bookmarkType) {
      case "title":
        await deleteTitleBookmark();
        break;
      case "name":
        await deleteNameBookmark();
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
        <Button variant="danger" onClick={() => handleDeleteBookmark()}>
          Remove Bookmark
        </Button>
        <Button variant="primary" onClick={() => handleUpdateNote()}>
          Update Note
        </Button>
      </>
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Bookmark</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter notes"
              defaultValue={storedNote}
              onChange={(e) => setInputNote(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>{modalButtons()}</Modal.Footer>
    </Modal>
  );
};

export default UpdateBookmark;
