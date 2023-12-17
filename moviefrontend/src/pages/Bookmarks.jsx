import React from "react";
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
