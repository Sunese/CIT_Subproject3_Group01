import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import { useNotification } from "../utils/NotificationContext";
import SearchClient from "../api/searchClient";
import PagedData from "../data/pagedData";
import { PaginationUrlBuilder } from "../utils/urlBuilder";
import Paginator from "./Paginator";
import SearchNameCard from "./SearchNameCard";
import NameData from "../data/name/nameData";

const NameSearch = () => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showNotification } = useNotification();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultsData, setResultsData] = useState(new PagedData());
  const [pageCount, setPageCount] = useState(0);
  const [itemCount, setItemCount] = useState(5);

  let handleResponse = (searchResponse) => {
    if (!searchResponse.ok) {
      throw new Error("Error searching");
    }
  };

  const nameSearch = useCallback(async () => {
    return SearchClient.nameSearch(
      token,
      PaginationUrlBuilder(
        pageCount,
        itemCount,
        searchParams.get("query"),
        searchParams.get("titletype")
      )
    );
  }, [token, pageCount, itemCount, searchParams]);

  const actorSearch = useCallback(async () => {
    return SearchClient.actorSearch(
      token,
      PaginationUrlBuilder(
        pageCount,
        itemCount,
        searchParams.get("query"),
        searchParams.get("titletype")
      )
    );
  }, [token, pageCount, itemCount, searchParams]);

  const writerSearch = useCallback(async () => {
    return SearchClient.writerSearch(
      token,
      PaginationUrlBuilder(
        pageCount,
        itemCount,
        searchParams.get("query"),
        searchParams.get("titletype")
      )
    );
  }, [token, pageCount, itemCount, searchParams]);

  const coplayerSearch = useCallback(async () => {
    return SearchClient.coPlayerSearch(
      token,
      PaginationUrlBuilder(
        pageCount,
        itemCount,
        searchParams.get("query"),
        searchParams.get("titletype")
      )
    );
  }, [token, pageCount, itemCount, searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let searchResponse = "";
        if (searchParams.get("section") === "actor") {
          searchResponse = await actorSearch();
        } else if (searchParams.get("section") === "coplayer") {
          searchResponse = await coplayerSearch();
        } else if (searchParams.get("section") === "writer") {
          searchResponse = await writerSearch();
        } else {
          searchResponse = await nameSearch(token);
        }
        handleResponse(searchResponse);
        const responseData = await searchResponse.json();
        setResultsData(PagedData.fromJson(responseData, NameData.fromJson));
        setLoading(false);
      } catch (error) {
        setError(error);
        showNotification("Failed to search", "danger");
        setLoading(false);
      }
    };
    fetchData();
  }, [
    searchParams,
    token,
    pageCount,
    itemCount,
    nameSearch,
    actorSearch,
    writerSearch,
    coplayerSearch,
  ]);

  function MapCards() {
    if (!Array.isArray(resultsData.items) || resultsData.total === 0) {
      return <div>No results found</div>;
    }
    return (
      <div>
        {resultsData.items.map((item) => (
          <SearchNameCard key={item.titleid} item={item} />
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

  return (
    <>
      <h1>Names:</h1>
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

export default NameSearch;
