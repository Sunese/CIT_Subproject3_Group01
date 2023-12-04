import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import SearchClient from "../api/searchClient";
import PagedData from "../data/pagedData";
import { ApiParamsBuilder } from "../utils/urlBuilder";
import Paginator from "./Paginator";

import NameData from "../data/name/nameData";

const NameSearch = () => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultsData, setResultsData] = useState(new PagedData());

  let handleResponse = (searchResponse) => {
    if (!searchResponse.ok) {
      throw new Error("Error searching");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const searchResponse = await SearchClient.search(
          token,
          ApiParamsBuilder(
            "name",
            searchParams.get("query"),
            searchParams.get("titletype")
          )
        );
        handleResponse(searchResponse);
        const responseData = await searchResponse.json();
        setResultsData(PagedData.fromJson(responseData, NameData.fromJson));
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error("error: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams, token]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Names:</h1>
      <Paginator page={resultsData} isTitles={false} />
    </>
  );
};

export default NameSearch;
