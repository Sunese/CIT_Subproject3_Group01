import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import BookmarkClient from "../api/bookmarkClient";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import TitleBookmarkPageItemData from "../data/user/titleBookmarkPageItemData";
import PagedData from "../data/pagedData";
import TitleBookmarks from "../components/Account/Bookmarks/TitleBookmarks";
import NameBookmarks from "../components/Account/Bookmarks/NameBookmarks";

const Bookmarks = () => {
  return (
    <>
      <h2>Title bookmarks</h2>
      <TitleBookmarks />
      <h2>Name bookmarks</h2>
      <NameBookmarks />
    </>
  );
};

export default Bookmarks;
