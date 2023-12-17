import { useAuth } from "../../utils/AuthContext";
import { useNotification } from "../../utils/NotificationContext";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import AccountClient from "../../api/accountClient";

const DeleteAccount = ({ show, onHide }) => {
  const [newPassword, setNewPassword] = useState("");
  const { isAuthenticated, token, username, logout } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await AccountClient.deleteAccount(
        username,
        token,
        newPassword
      );
      if (response.status === 200) {
        showNotification("Account deleted", "success");
        navigate("/");
      } else {
        showNotification("Error deleting account", "danger");
      }
    } catch (error) {
      showNotification("Error deleting account", "danger");
      onHide();
    }
    setLoading(false);
    logout();
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccount;
