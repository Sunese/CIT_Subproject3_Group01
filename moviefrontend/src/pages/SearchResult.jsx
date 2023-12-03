import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import Spinner from "react-bootstrap/esm/Spinner";
import SearchClient from "../api/searchClient";
import TitleResultsItemData from "../data/title/titleResultsItemData";
import PagedData from "../data/pagedData";

const SearchResult = () => {
  const { token } = useAuth();
  const { searchParameters } = useParams();
  const [error, setError] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [titleSearchResultState, setTitleSearchResult] = useState(
    new TitleResultsItemData()
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const titleSearchResultJson = await SearchClient.getTitleSearchResults(
          token,
          searchParameters
        );
        const titleSearchResult = PagedData.fromJson(
          titleSearchResultJson,
          TitleResultsItemData.fromJson
        );
        setTitleSearchResult(titleSearchResult);
        setLoadingSearch(false);
      } catch (error) {
        setLoadingSearch(false);
        setError(error.message);
        console.error("error: ", error);
      }
    };
    fetchData();
  }, [token, searchParameters]);

  if (loadingSearch) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <h1> Search Results for {searchParameters} </h1>
    </>
  );
};

export default SearchResult;
