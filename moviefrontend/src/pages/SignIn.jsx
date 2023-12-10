import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import AccountClient from "../api/accountClient";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { useNotification } from "../utils/NotificationContext";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await AccountClient.signIn(username, password);

      if (response.status === 401) {
        showNotification("Invalid credentials", "danger");
        setLoading(false);
        return;
      } else if (!response.ok) {
        setLoading(false);
        showNotification("Something went wrong, try again", "danger");
        return;
      }

      const data = await response.json();
      const signedInUsername = data.userName;
      const token = data.token;

      // Use the login function from useAuth to update the authentication state
      login(token, signedInUsername);
      setLoading(false);
      showNotification("Signed in successfully", "success");
      navigate(-1);
    } catch (error) {
      setLoading(false);
      showNotification("Something went wrong, try again", "danger");
    }
  };

  const validateAndSetUsername = (username) => {
    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
      showNotification("Username can only contain letters, numbers and underscores");
    }
    setUsername(username)
  };

  return (
    <>
      <div className="text-center">
        <h1>Sign in</h1>
      </div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Text className="text-muted">
              Dont have an account? <Link to="/signup">Sign Up</Link>
            </Form.Text>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="username"
                value={username}
                onChange={(event) => validateAndSetUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <Button onClick={handleSignIn} variant="primary">
                Sign In
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;