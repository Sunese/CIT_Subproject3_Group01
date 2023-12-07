import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useNotification } from "../utils/NotificationContext";

const NotificationBox = () => {
  const { hideNotification, notification } = useNotification();
  const [isVisible, setIsVisible] = useState(true);

  const duration = 1500;

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, notification]);

  if (!notification) {
    return null;
  }

  return (
    <Alert
      show={isVisible}
      onClose={() => {
        setIsVisible(false);
        hideNotification();
      }}
      variant={notification.type}
      className="notification-box"
    >
      {notification.message}
    </Alert>
  );
};

export default NotificationBox;
