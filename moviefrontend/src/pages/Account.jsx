import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationContext";
import UpdateEmail from "../components/Account/UpdateEmail";
import AccountClient from "../api/accountClient";
import UpdatePassword from "../components/Account/UpdatePassword";

const Account = () => {
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      showNotification("You must be signed in to view your account", "warning");
      navigate("/signin");
      return;
    }

    const getAccountInfo = async () => {
      try {
        const accountClient = new AccountClient();
        const response = await accountClient.GetAccountInfo(username, token);
        if (response.status === 200) {
          const data = await response.json();
          setAccountInfo(data);
        } else {
          showNotification(
            "There was an error getting your account info",
            "danger"
          );
        }
        setLoading(false);
      } catch (error) {
        showNotification(
          "There was an error getting your account info",
          "danger"
        );
        setLoading(false);
      }
    };

    getAccountInfo();
  }, [
    isAuthenticated,
    token,
    showUpdateEmail,
    username,
    navigate,
    showNotification,
  ]);

  const handleUpdateEmailClick = () => {
    setShowUpdateEmail(true);
  };

  const handleCloseUpdateEmail = () => {
    setShowUpdateEmail(false);
  };

  const handleUpdatePasswordClick = () => {
    setShowUpdatePassword(true);
  };

  const handleCloseUpdatePassword = () => {
    setShowUpdatePassword(false);
  };

  const makeNotificationSayHi = () => {
    showNotification("Haiiiii :3", "success");
  };

  return (
    <>
      <Row>
        <Card className="account-card">
          <Card.Body>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                <Card.Title>Account</Card.Title>
                <Card.Text>Username: {accountInfo.username}</Card.Text>
                <Card.Text>Email: {accountInfo.email}</Card.Text>
              </>
            )}
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Button
          className="account-button"
          variant="primary"
          onClick={handleUpdateEmailClick}
        >
          Update Email
        </Button>
      </Row>
      <Row>
        <Button
          className="account-button"
          variant="primary"
          onClick={handleUpdatePasswordClick}
        >
          Update Password
        </Button>
      </Row>
      <Row>
        <Button
          className="account-button"
          variant="danger"
          onClick={makeNotificationSayHi}
        >
          Hi
        </Button>
      </Row>
      {showUpdateEmail && (
        <UpdateEmail show={showUpdateEmail} onHide={handleCloseUpdateEmail} />
      )}
      {showUpdatePassword && (
        <UpdatePassword
          show={showUpdatePassword}
          onHide={handleCloseUpdatePassword}
        />
      )}
    </>
  );
};

export default Account;
