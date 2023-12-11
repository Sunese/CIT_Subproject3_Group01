import React, { useState, useEffect } from "react";
import { useAuth } from "../../../utils/AuthContext";
import BookmarkClient from "../../../api/bookmarkClient";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import PagedData from "../../../data/pagedData";
import { useNotification } from "../../../utils/NotificationContext";
import Spinner from "react-bootstrap/Spinner";
import NameBookmarkPageItemData from "../../../data/user/nameBookmarkPageItemData";
import { Button } from "react-bootstrap";
import AddBookmark from "../../Bookmark/AddBookmark";
import UpdateBookmark from "../../Bookmark/UpdateBookmark";

const NameBookmarks = () => {
  const { isAuthenticated, token, username } = useAuth();
  const [nameBookmarks, setNameBookmarks] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showUpdateFor, setShowUpdateFor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        return;
      }
      setLoading(true);
      try {
        const response = await BookmarkClient.getNameBookmarks(token, username);
        if (!response.ok) {
          throw new Error();
        }
        const json = await response.json();
        console.log("json: ", json);
        const nameBookmarks = PagedData.fromJson(
          json,
          NameBookmarkPageItemData.fromJson
        );
        console.log("name bookmarks: ", nameBookmarks);
        setNameBookmarks(nameBookmarks);
      } catch (error) {
        console.error("error: ", error);
        showNotification("Error loading name bookmarks", "danger");
        setError("Could not load name bookmarks");
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

  if (!nameBookmarks) {
    return <div>No name bookmarks</div>;
  }

  return (
    <>
      <ul>
        {nameBookmarks.items.map((item) => (
          <li key={item.nameID}>
            <Link to={`/name/${item.nameID}`}>{item.name.primaryName}</Link>
            <Button onClick={() => setShowUpdateFor(item.nameID)}>
              Update
            </Button>
            <p>{item.notes}</p>
            <UpdateBookmark
              id={item.nameID}
              bookmarkType={"name"}
              show={showUpdateFor === item.nameID}
              onHide={() => setShowUpdateFor(null)}
              storedNote={item.notes}
            ></UpdateBookmark>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NameBookmarks;
