import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useNotification } from "../utils/NotificationContext";

const SignOutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      logout();
      // redirect user back to home page when signed out
      // TODO: pop up a message to let user know they are signed out?
      // navigate('/');
      showNotification("You have successfully signed out.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Button variant="secondary" onClick={handleLogout}>
        Sign Out
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignOutButton;
