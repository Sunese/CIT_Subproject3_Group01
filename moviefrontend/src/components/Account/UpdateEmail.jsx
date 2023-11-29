import { useAuth } from "../../utils/AuthContext";
import { useNotification } from "../../utils/NotificationContext";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import AccountClient from "../../api/accountClient";

const UpdateEmail = ({ show, onHide }) => {
  const [newEmail, setNewEmail] = useState("");
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async () => {
    setLoading(true);
    try {
      const accountClient = new AccountClient();
      const response = await accountClient.UpdateEmail(
        username,
        token,
        newEmail
      );
      if (response.status === 200) {
        showNotification("Email updated successfully", "success");
      } else {
        showNotification("Error updating email", "danger");
      }
    } catch (error) {
      showNotification("Error updating password", "danger");
      onHide();
    }
    setLoading(false);
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewEmail">
              <Form.Label>New Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your new email address"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateEmail}>
                Update Email
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateEmail;
