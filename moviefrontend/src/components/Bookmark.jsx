import React, { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import BookmarkClient from "../api/bookmarkClient";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import TitleBookmarkData from "../data/bookmark/titleBookmarkData";
import { Link } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { MdBookmarkRemove } from "react-icons/md";
import { CiBookmarkRemove } from "react-icons/ci";
import { MdBookmark } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkPlus } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { BsBookmarkDashFill } from "react-icons/bs";
import { useNotification } from "../utils/NotificationContext";

const Bookmark = ({ titleid }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [storedBookmark, setStoredBookmark] = useState(null);
  const { isAuthenticated, username, token } = useAuth();
  const [loadingBookmark, setLoadingBookmark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingBookmark(true);
      if (!isAuthenticated) {
        return;
      }
      try {
        const response = await BookmarkClient.getTitleBookmark(
          token,
          username,
          titleid
        );
        if (response.status === 200) {
          const json = await response.json();
          setIsBookmarked(true);
          setStoredBookmark(TitleBookmarkData.fromJson(json));
        } else if (response.status === 404) {
          setIsBookmarked(false);
          setStoredBookmark(null);
        }
      } catch (error) {
        showNotification("Could not retreive user's bookmark", "danger");
      } finally {
        setLoadingBookmark(false);
      }
    };

    fetchData();
  }, [isAuthenticated, token, titleid, username, isBookmarked]);

  const handleAddBookmark = async (notes) => {
    setLoadingBookmark(true);
    try {
      const response = await BookmarkClient.addTitleBookmark(
        token,
        username,
        titleid,
        "test notes"
      );
      if (response.status === 201) {
        showNotification("Bookmark added", "success");
        setIsBookmarked(true);
      } else {
        showNotification("Could not add bookmark", "danger");
      }
    } catch (error) {
      showNotification("Could not add bookmark", "danger");
    } finally {
      setLoadingBookmark(false);
    }
  };

  const handleRemoveBookmark = async () => {
    setLoadingBookmark(true);
    try {
      const response = await BookmarkClient.removeTitleBookmark(
        token,
        username,
        titleid
      );
      if (response.status === 200) {
        setStoredBookmark(null);
        setIsBookmarked(false);
        showNotification("Bookmark removed", "success");
      } else {
        showNotification("Could not remove bookmark", "danger");
      }
    } catch (error) {
      showNotification("Could not remove bookmark", "danger");
    } finally {
      setLoadingBookmark(false);
    }
  };

  if (!isAuthenticated) {
    return <Link to="/signin">Sign in to bookmark</Link>;
  }

  if (loadingBookmark) {
    return <Spinner />;
  }

  if (storedBookmark) {
    return (
      <div
        className={`icon-container ${isHovered ? "bookmark-hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <BsBookmarkDashFill onClick={() => handleRemoveBookmark()} />
        ) : (
          <BsBookmarkCheckFill />
        )}
      </div>
    );
  }

  if (!storedBookmark) {
    return (
      <div
        className={`icon-container ${isHovered ? "no-bookmark-hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <BsBookmarkPlus onClick={() => handleAddBookmark()} />
        ) : (
          <BsBookmark />
        )}
      </div>
    );
  }

  return <Spinner />;
};

export default Bookmark;
