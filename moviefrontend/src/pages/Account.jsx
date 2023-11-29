import React, { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { Card } from "react-bootstrap";
import { SetGlobalNotification } from "../utils/Notification";
import { Navigate, useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationContext";

const Account = () => {
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      showNotification("You must be signed in to view your account", "warning");
      navigate("/signin");
      return;
    }
  }, [isAuthenticated, navigate, showNotification]);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Account</Card.Title>
          <Card.Text>Username: {username}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Account;
