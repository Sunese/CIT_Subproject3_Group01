import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationContext";
import UpdateEmail from "../components/Account/UpdateEmail";
import AccountClient from "../api/accountClient";
import UpdatePassword from "../components/Account/UpdatePassword";
import DeleteAccount from "../components/Account/DeleteAccount";

const Account = () => {
  const { isAuthenticated, token, username } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      showNotification("You must be logged in to view your account", "warning");
      navigate("/signin");
      return;
    }
    console.log("Account effect triggered");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, username, showUpdateEmail, showUpdatePassword]);

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
          onClick={() => setShowUpdateEmail(true)}
        >
          Update Email
        </Button>
      </Row>
      <Row>
        <Button
          className="account-button"
          variant="primary"
          onClick={() => setShowUpdatePassword(true)}
        >
          Update Password
        </Button>
      </Row>
      <Row>
        <Button
          className="account-button"
          variant="danger"
          onClick={() => setShowDeleteAccount(true)}
        >
          Delete Account
        </Button>
      </Row>
      <UpdateEmail
        show={showUpdateEmail}
        onHide={() => setShowUpdateEmail(false)}
      />
      <UpdatePassword
        show={showUpdatePassword}
        onHide={() => setShowUpdatePassword(false)}
      />
      <DeleteAccount
        show={showDeleteAccount}
        onHide={() => setShowDeleteAccount(false)}
      />
    </>
  );
};

export default Account;
