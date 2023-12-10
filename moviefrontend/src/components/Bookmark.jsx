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
import { BsFillBookmarkPlusFill } from "react-icons/bs";

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

  const HoverableBookmark = ({ filled }) => {
    if (filled && isHovered) {
      return <BsBookmarkDashFill title="Remove bookmark" />;
    } else if (filled && !isHovered) {
      return <BsBookmarkCheckFill />;
    } else if (!filled && isHovered) {
      return <BsFillBookmarkPlusFill title="Add bookmark" />;
    } else if (!filled && !isHovered) {
      return <BsBookmarkPlus />;
    }
  };

  const Bookmark = ({ filled, className, onClick }) => (
    <div
      className={`bookmark-icon-container ${isHovered ? `${className}` : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <HoverableBookmark filled={filled}></HoverableBookmark>
    </div>
  );

  if (!isAuthenticated) {
    return <Link to="/signin">Sign in to bookmark</Link>;
  }

  if (loadingBookmark) {
    return <Spinner />;
  }

  if (storedBookmark) {
    return (
      <Bookmark filled={true} onClick={() => handleRemoveBookmark()}></Bookmark>
    );
  }

  return (
    <Bookmark filled={false} onClick={() => handleAddBookmark()}></Bookmark>
  );
};

export default Bookmark;
