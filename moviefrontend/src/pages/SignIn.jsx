import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import AccountClient from "../api/accountClient";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useNotification } from "../utils/NotificationContext";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSignIn = async () => {
    try {
      const accountClient = new AccountClient();
      const response = await accountClient.SignIn(username, password);

      if (response.status === 401) {
        showNotification("Invalid credentials", "danger");
        return;
      } else if (!response.ok) {
        showNotification("Something went wrong, try again", "danger");
        return;
      }

      const data = await response.json();
      const signedInUsername = data.userName;
      const token = data.token;

      // Use the login function from useAuth to update the authentication state
      login(token, signedInUsername);
      showNotification("Signed in successfully", "success");
      navigate("/");
    } catch (error) {
      showNotification("Something went wrong, try again", "danger");
    }
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
                onChange={(event) => setUsername(event.target.value)}
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

            <Button onClick={handleSignIn} variant="primary">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
