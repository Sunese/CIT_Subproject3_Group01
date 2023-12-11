import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import SearchClient from "../api/searchClient";
import PagedData from "../data/pagedData";
import { PaginationUrlBuilder } from "../utils/urlBuilder";
import Paginator from "./Paginator";
import TitleData from "../data/title/titleData";
import SearchTitleCard from "./SearchTitleCard";
import TitleSearchData from "../data/search/titleSearchData";

const TitleSearch = () => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultsData, setResultsData] = useState(new PagedData());
  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(10);

  let handleResponse = (searchResponse) => {
    if (!searchResponse.ok) {
      throw new Error("Error searching");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const searchResponse = await SearchClient.titleSearch(
          token,
          PaginationUrlBuilder(
            pageCount,
            itemCount,
            searchParams.get("query"),
            searchParams.get("titletype")
          )
        );
        handleResponse(searchResponse);
        const responseData = await searchResponse.json();
        setResultsData(
          PagedData.fromJson(responseData, TitleSearchData.fromJson)
        );
        if (responseData.totalCount < 0) {
          throw new Error("Error searching");
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error("error: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams, token, pageCount, itemCount]);

  function MapCards() {
    if (!Array.isArray(resultsData.items) || resultsData.total === 0) {
      return <div>No results found</div>;
    }
    return (
      <div>
        {resultsData.items.map((item) => (
          <SearchTitleCard key={item.titleid} item={item} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  // { page, pageCount, setPageCount, setItemCount }
  return (
    <>
      <h1>Titles:</h1>
      <MapCards />
      <Paginator
        pageCount={pageCount}
        setPageCount={setPageCount}
        maxPageCount={resultsData.numberOfPages}
        itemCount={itemCount}
        setItemCount={setItemCount}
      />
    </>
  );
};

export default TitleSearch;
