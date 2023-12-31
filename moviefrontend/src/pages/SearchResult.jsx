import React from "react";
import { useSearchParams } from "react-router-dom";

import TitleSearch from "../components/TitleSearch";
import NameSearch from "../components/NameSearch";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function ConditionalSearch() {
    if (searchParams.get("section") === "title") {
      return <TitleSearch />;
    } else if (
      searchParams.get("section") === "name" ||
      searchParams.get("section") === "actor" ||
      searchParams.get("section") === "writer" ||
      searchParams.get("section") === "coplayer"
    ) {
      return <NameSearch />;
    } else if (searchParams.get("section") === "all") {
      return (
        <>
          <TitleSearch />
          <NameSearch />
        </>
      );
    }
  }

  return (
    <>
      <h1> Search Results for {searchParams.get("query")} </h1>
      <ConditionalSearch />
    </>
  );
};

export default SearchResult;
