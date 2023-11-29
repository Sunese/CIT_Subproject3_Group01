import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import BookmarkClient from "../api/bookmarkClient";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { SetGlobalNotification } from "../utils/Notification";

const UserBookmarks = () => {
  const { isAuthenticated, token, username } = useAuth();
  const [error, setError] = useState(null);
  const [loadingTitleBookmarks, setLoadingTitleBookmarks] = useState(true);
  const [titleBookmarks, setTitleBookmarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        navigate("/signin");
        return;
      }
      try {
        const bookmarkClient = new BookmarkClient();
        const pagedTitleBookmarks = await bookmarkClient.getTitleBookmarks(
          token,
          username
        );
        setTitleBookmarks(pagedTitleBookmarks.items);
        setLoadingTitleBookmarks(false);
      } catch (error) {
        setLoadingTitleBookmarks(false);
        setError("Error loading bookmarks. Please try again later.");
      }
    };
    fetchData();
  }, [isAuthenticated, token, username, navigate]);

  if (loadingTitleBookmarks) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <h2>Bookmarks</h2>
      <ul>
        {titleBookmarks.map((bookmark) => {
          return (
            <li key={bookmark.titleID}>
              {bookmark.primaryTitle} <br /> {bookmark.notes}{" "}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserBookmarks;
