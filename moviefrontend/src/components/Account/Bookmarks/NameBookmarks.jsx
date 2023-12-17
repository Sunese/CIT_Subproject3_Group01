import React, { useState, useEffect } from "react";
import { useAuth } from "../../../utils/AuthContext";
import BookmarkClient from "../../../api/bookmarkClient";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import PagedData from "../../../data/pagedData";
import { useNotification } from "../../../utils/NotificationContext";
import Spinner from "react-bootstrap/Spinner";
import NameBookmarkPageItemData from "../../../data/user/nameBookmarkPageItemData";
import { Button, Table } from "react-bootstrap";
import AddBookmark from "../../Bookmark/AddBookmark";
import UpdateBookmark from "../../Bookmark/UpdateBookmark";
import Paginator from "../../Paginator";

const NameBookmarks = () => {
  const { isAuthenticated, token, username } = useAuth();
  const [nameBookmarks, setNameBookmarks] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showUpdateFor, setShowUpdateFor] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        return;
      }
      setLoading(true);
      try {
        const response = await BookmarkClient.getNameBookmarks(
          token,
          username,
          page,
          pageSize
        );
        if (!response.ok) {
          throw new Error();
        }
        const json = await response.json();
        const nameBookmarks = PagedData.fromJson(
          json,
          NameBookmarkPageItemData.fromJson
        );
        setNameBookmarks(nameBookmarks);
      } catch (error) {
        showNotification("Error loading name bookmarks", "danger");
        setError("Could not load name bookmarks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated, token, username, showUpdateFor, page, pageSize]);

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

  const MapNameBookmarks = () => {
    return nameBookmarks.items.map((item) => (
      <tr key={item.nameID}>
        <td>
          <Link to={`/name/${item.nameID}`}>{item.name.primaryName}</Link>
        </td>
        <td>
          <p>{item.notes}</p>
        </td>
        <td>
          <Button onClick={() => setShowUpdateFor(item.nameID)}>Update</Button>
        </td>
        <UpdateBookmark
          id={item.nameID}
          bookmarkType={"name"}
          show={showUpdateFor === item.nameID}
          onHide={() => setShowUpdateFor(null)}
          storedNote={item.notes}
        ></UpdateBookmark>
      </tr>
    ));
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <MapNameBookmarks />
        </tbody>
      </Table>
      <Paginator
        pageCount={page}
        setPageCount={setPage}
        itemCount={pageSize}
        setItemCount={setPageSize}
        maxPageCount={nameBookmarks?.numberOfPages}
      />
    </>
  );
};

export default NameBookmarks;
