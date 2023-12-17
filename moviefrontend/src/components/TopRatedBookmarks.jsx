import React, { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNotification } from "../utils/NotificationContext";
import TitleBookmarkData from "../data/bookmark/titleBookmarkData";
import PagedData from "../data/pagedData";
import Card from "react-bootstrap/Card";
import BookmarkClient from "../api/bookmarkClient";

const TopRatedBookmarks = () => {
  const { isAuthenticated, username, token } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchTopRatedBookmarks = async () => {
      try {
        setLoading(true);
        const response = await BookmarkClient.getTopRatedBookmarks(
          token,
          username
        );
        if (!response.ok) {
          throw new Error();
        }
        const json = await response.json();
        const bookmarks = PagedData.fromJson(json, TitleBookmarkData.fromJson);
        setBookmarks(bookmarks.items);
      } catch (error) {
        showNotification("Error fetching top rated bookmarks", "danger");
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated) {
      return;
    }
    fetchTopRatedBookmarks();
  }, [isAuthenticated, username, token]);

  if (!isAuthenticated) {
    return <Link to="/signin">Sign in to see your top rated bookmarks</Link>;
  }

  return (
    <ul>
      {bookmarks.map((bookmark) => (
        <li key={bookmark.title.titleID}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to={`/title/${bookmark.title.titleID}`}>
                  {bookmark.title.primaryTitle}
                </Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {bookmark.title.titleRating.averageRating}
              </Card.Subtitle>
              <Card.Text>{bookmark.notes}</Card.Text>
            </Card.Body>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default TopRatedBookmarks;
