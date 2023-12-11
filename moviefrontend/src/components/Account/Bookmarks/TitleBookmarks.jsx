import React, { useState, useEffect } from "react";
import { useAuth } from "../../../utils/AuthContext";
import BookmarkClient from "../../../api/bookmarkClient";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import TitleBookmarkPageItemData from "../../../data/user/titleBookmarkPageItemData";
import PagedData from "../../../data/pagedData";
import { useNotification } from "../../../utils/NotificationContext";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import AddBookmark from "../../Bookmark/AddBookmark";
import UpdateBookmark from "../../Bookmark/UpdateBookmark";

const TitleBookmarks = () => {
  const { isAuthenticated, token, username } = useAuth();
  const [titleBookmarksState, setTitleBookmarks] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [error, setError] = useState(null);
  // const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdateFor, setShowUpdateFor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        return;
      }
      setLoading(true);
      try {
        const response = await BookmarkClient.getTitleBookmarks(
          token,
          username
        );
        if (!response.ok) {
          throw new Error();
        }
        const json = await response.json();
        console.log("json: ", json);
        const titleBookmarks = PagedData.fromJson(
          json,
          TitleBookmarkPageItemData.fromJsonWithoutRating
        );
        console.log("titleBookmarks: ", titleBookmarks);
        setTitleBookmarks(titleBookmarks);
      } catch (error) {
        console.error("error: ", error);
        showNotification("Error loading title bookmarks", "danger");
        setError("Could not load title bookmarks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated, token, username, showUpdateFor]);

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    showNotification("Sign in to see your bookmarks", "warning");
    navigate("/signin");
    return <></>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!titleBookmarksState) {
    return <div>No title bookmarks</div>;
  }

  return (
    <>
      <ul>
        {titleBookmarksState.items.map((item) => (
          <li key={item.titleID}>
            <Link to={`/title/${item.titleID}`}>{item.title.primaryTitle}</Link>
            <Button onClick={() => setShowUpdateFor(item.titleID)}>
              Update
            </Button>
            <p>{item.notes}</p>
            <UpdateBookmark
              id={item.titleID}
              bookmarkType={"title"}
              show={showUpdateFor === item.titleID}
              onHide={() => setShowUpdateFor(null)}
              storedNote={item.notes}
            ></UpdateBookmark>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TitleBookmarks;
