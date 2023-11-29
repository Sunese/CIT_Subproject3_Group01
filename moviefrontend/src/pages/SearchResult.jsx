import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { ApiParamsBuilder } from "../utils/urlBuilder";
import { useSearchParams } from "react-router-dom";

import Spinner from "react-bootstrap/esm/Spinner";
import SearchClient from "../api/searchClient";
import TitleResultsProcessor from "../data/title/titleResultsProcessor";
import NameResultsProcessor from "../data/name/nameResultsProcessor";
import ResultsData from "../data/resultsData";
import Paginator from "../components/Paginator";

const SearchResult = () => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchError, setSearchError] = useState(null);
  const [error, setError] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [resultsData, setResultsData] = useState(new ResultsData());

  let handleResponse = (searchResponse) => {
    if (!searchResponse.ok) {
      throw new Error("Error searching");
    }
  };

  const handleSearch = useCallback(async () => {
    try {
      const searchClient = new SearchClient();
      const titleResultsProcessor = new TitleResultsProcessor();
      const nameResultsProcessor = new NameResultsProcessor();

      if (searchParams.get("section") === "title") {
        const searchResponse = await searchClient.search(
          token,
          ApiParamsBuilder(
            searchParams.get("section"),
            searchParams.get("query"),
            searchParams.get("titletype")
          )
        );
        handleResponse(searchResponse);
        const responseData = await searchResponse.json();
        setResultsData(titleResultsProcessor.processPage(responseData));
      } else if (searchParams.get("section") === "name") {
        const searchResponse = await searchClient.search(
          token,
          ApiParamsBuilder(
            searchParams.get("section"),
            searchParams.get("query"),
            searchParams.get("titletype")
          )
        );
        handleResponse(searchResponse);
        const responseData = await searchResponse.json();
        setResultsData(nameResultsProcessor.processPage(responseData));
      } else if (searchParams.get("section") === "all") {
        return "Not Implemented";
      } else {
        return "Invalid Search Section";
      }
    } catch (error) {
      console.error("error: ", error);
    }
  }, [searchParams, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleSearch();
        setLoadingSearch(false);
      } catch (error) {
        setLoadingSearch(false);
        setSearchError(error.message);
        console.error("error: ", error);
      }
    };
    fetchData();
  }, [token, searchParams, handleSearch]);

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
      <h1> Search Results for {searchParams.get("query")} </h1>
      <Paginator page={resultsData} />
    </>
  );
};

export default SearchResult;
