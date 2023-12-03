import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import BookmarkClient from "../api/bookmarkClient";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import TitleBookmarkPageItemData from "../data/user/titleBookmarkPageItemData";
import PagedData from "../data/pagedData";

const UserBookmarks = () => {
  const { isAuthenticated, token, username } = useAuth();
  const [error, setError] = useState(null);
  const [loadingTitleBookmarks, setLoadingTitleBookmarks] = useState(true);
  const [titleBookmarksState, setTitleBookmarks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        navigate("/signin");
        return;
      }
      try {
        const jsonTitleBookmarks = PagedData.fromJson(
          await BookmarkClient.getTitleBookmarks(token, username),
          TitleBookmarkPageItemData.fromJson
        );
        const titleBookmarks =
          TitleBookmarkPageItemData.fromJson(jsonTitleBookmarks);
        // TODO: will this reference the const above or the useState?
        setTitleBookmarks(titleBookmarks);
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
        {titleBookmarksState.items.map((bookmark) => {
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
