import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import BookmarkClient from "../../api/bookmarkClient";
import { useAuth } from "../../utils/AuthContext";
import { useState } from "react";
import TitleBookmarkData from "../../data/bookmark/titleBookmarkData";
import { Link } from "react-router-dom";
import { BsBookmarkPlus } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { BsBookmarkCheck } from "react-icons/bs";
import { useNotification } from "../../utils/NotificationContext";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import NameBookmarkData from "../../data/bookmark/nameBookmarkData";
import UpdateBookmark from "./UpdateBookmark";
import AddBookmark from "./AddBookmark";

const BookmarkButton = ({ bookmarkType, id }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [storedBookmark, setStoredBookmark] = useState(null);
  const { isAuthenticated, username, token } = useAuth();
  const [loadingBookmark, setLoadingBookmark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { showNotification } = useNotification();
  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [showUpdateBookmark, setShowUpdateBookmark] = useState(false);

  useEffect(() => {
    setLoadingBookmark(true);
    if (!isValidBookmarkType(bookmarkType)) {
      return;
    }
    if (!isAuthenticated) {
      return;
    }
    switch (bookmarkType) {
      case "title":
        fetchTitleBookmarkData();
        break;
      case "name":
        fetchNameBookmarkData();
        break;
      default:
        break;
    }
    setLoadingBookmark(false);
  }, [isAuthenticated, token, id, username, isBookmarked]);

  const isValidBookmarkType = (bookmarkType) => {
    return bookmarkType === "title" || bookmarkType === "name";
  };

  const fetchNameBookmarkData = async () => {
    try {
      const response = await BookmarkClient.getNameBookmark(
        token,
        username,
        id
      );
      if (response.status === 200) {
        const json = await response.json();
        setIsBookmarked(true);
        setStoredBookmark(NameBookmarkData.fromJson(json));
      } else if (response.status === 404) {
        setIsBookmarked(false);
        setStoredBookmark(null);
      }
    } catch (error) {
      showNotification("Could not retreive bookmark", "danger");
    }
  };

  const fetchTitleBookmarkData = async () => {
    try {
      const response = await BookmarkClient.getTitleBookmark(
        token,
        username,
        id
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
    }
  };

  const HoverableBookmark = ({ filled }) => {
    if (filled && isHovered) {
      return <BsBookmarkCheck title="Update bookmark" />;
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

  if (!isValidBookmarkType(bookmarkType)) {
    return (
      <p style={{ color: "red" }}>Something went wrong when loading bookmark</p>
    );
  }

  if (!isAuthenticated) {
    return <Link to="/signin">Sign in to bookmark</Link>;
  }

  if (loadingBookmark) {
    return <Spinner />;
  }

  if (storedBookmark) {
    return (
      <>
        <Bookmark
          filled={true}
          onClick={() => setShowUpdateBookmark(true)}
        ></Bookmark>
        <UpdateBookmark
          id={id}
          bookmarkType={bookmarkType}
          show={showUpdateBookmark}
          storedNote={storedBookmark.notes}
          onHide={() => {
            setShowUpdateBookmark(false);
            setIsBookmarked(false);
            setIsHovered(false);
          }}
        />
      </>
    );
  }

  return (
    <>
      <Bookmark
        filled={false}
        onClick={() => {
          setShowAddBookmark(true);
        }}
      ></Bookmark>
      <AddBookmark
        id={id}
        bookmarkType={bookmarkType}
        show={showAddBookmark}
        onHide={() => {
          setShowAddBookmark(false);
          setIsBookmarked(true);
          setIsHovered(false);
        }}
      />
    </>
  );
};

export default BookmarkButton;
