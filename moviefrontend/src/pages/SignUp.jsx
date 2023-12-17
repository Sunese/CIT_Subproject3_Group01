import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import { useAuth } from "../utils/AuthContext";
import AccountClient from "../api/accountClient";
import { useNavigate } from "react-router";
import { useNotification } from "../utils/NotificationContext";
import Spinner from "react-bootstrap/Spinner";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const calculatePasswordStrength = () => {
    return password.length * 4;
  };

  const isInvalidUsername = (username) => {
    if (username.length < 3) {
      showNotification("Username must be at least 3 characters long", "danger");
      return true;
    } else if (username.length > 20) {
      showNotification(
        "Username must be less than 20 characters long",
        "danger"
      );
      return true;
    } else if (!/^[a-zA-Z0-9_]*$/.test(username)) {
      showNotification(
        "Username can only contain letters, numbers and underscores",
        "danger"
      );
      return true;
    }
    return false;
  };

  const isInvalidPassword = (password) => {
    if (password.length < 8) {
      showNotification("Password must be at least 8 characters long", "danger");
      return true;
    }
    return false;
  };

  const isInvalidEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification("Invalid email address", "danger");
      return true;
    }
    return false;
  };

  const getPasswordStrengthVariant = () => {
    const strength = calculatePasswordStrength();
    if (strength < 30) {
      return "danger";
    }
    if (strength < 60) {
      return "warning";
    }
    return "success";
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (
      isInvalidEmail(email) ||
      isInvalidUsername(username) ||
      isInvalidPassword(password)
    ) {
      setLoading(false);
      return;
    }
    try {
      const signUpResponse = await AccountClient.signUp(
        username,
        email,
        password,
        ""
      );

      if (!signUpResponse.ok) {
        throw new Error("Error signing up");
      }

      const signInReponse = await AccountClient.signIn(username, password);

      if (!signInReponse.ok) {
        throw new Error("Error signing in");
      }

      const data = await signInReponse.json();
      const jwttoken = data.token;
      const jwtusername = data.userName;

      // Use the login function from useAuth to update the authentication state
      login(jwttoken, jwtusername);
      navigate("/");
      showNotification("Welcome " + username, "success");
    } catch (error) {
      showNotification("Failed to sign up", "danger");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    showNotification("You are already signed in", "warning");
    navigate("/");
  }

  return (
    <>
      <h1>Sign Up</h1>
      <p>Sign up for an account to save your favorite movies!</p>
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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

        <ProgressBar
          className="mb-3"
          animated
          now={calculatePasswordStrength()}
          striped
          variant={getPasswordStrengthVariant()}
        />
        {loading ? (
          <Spinner />
        ) : (
          <Button onClick={handleSignUp} variant="primary">
            Sign Up
          </Button>
        )}
      </Form>
    </>
  );
}

export default SignUp;
