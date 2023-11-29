const SetGlobalNotification = (message, type) => {
  const notification = JSON.stringify({
    type: type,
    message: message,
  });
  localStorage.setItem("notification", notification);
};

const GetGlobalNotification = () => {
  const notificationData = localStorage.getItem("notification");
  if (notificationData) {
    const { type, message } = JSON.parse(notificationData);
    ClearNotification();
    return { type, message };
  }
  return null;
};

const ClearNotification = () => {
  localStorage.removeItem("notification");
};

export { SetGlobalNotification, GetGlobalNotification };
