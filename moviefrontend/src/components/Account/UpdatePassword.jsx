import { useAuth } from "../../utils/AuthContext";
import { useNotification } from "../../utils/NotificationContext";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import AccountClient from "../../api/accountClient";

const UpdatePassword = ({ show, onHide }) => {
  const [newPassword, setNewPassword] = useState("");
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async () => {
    setLoading(true);
    try {
      const response = await AccountClient.updatePassword(
        username,
        token,
        newPassword
      );
      if (response.status === 200) {
        showNotification("Password updated successfully", "success");
      } else {
        showNotification("Error updating password", "danger");
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
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
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
                Update Password
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePassword;
