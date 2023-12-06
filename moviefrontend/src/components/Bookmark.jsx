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

const Bookmark = ({ titleid }) => {
  const [storedBookmark, setStoredBookmark] = useState(null);
  const { isAuthenticated, username, token } = useAuth();
  const [error, setError] = useState(null);
  const [loadingBookmark, setLoadingBookmark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
          setStoredBookmark(TitleBookmarkData.fromJson(json));
        } else if (response.status === 404) {
          setStoredBookmark(null);
        }
      } catch (error) {
        setError("Could not retreive user's bookmark");
      } finally {
        setLoadingBookmark(false);
      }
    };

    fetchData();
  }, [titleid, isAuthenticated, username, token]);

  const handleAddBookmark = async () => {
    setLoadingBookmark(true);
    try {
      const response = await BookmarkClient.addTitleBookmark(
        token,
        username,
        titleid
      );
      if (response.status === 200) {
        const json = await response.json();
        setStoredBookmark(TitleBookmarkData.fromJson(json));
      }
    } catch (error) {
      setError("Could not add bookmark");
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

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (storedBookmark) {
    return (
      <div
        className={`icon-container ${isHovered ? "bookmark-hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? <BsBookmarkDashFill /> : <BsBookmarkCheckFill />}
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
