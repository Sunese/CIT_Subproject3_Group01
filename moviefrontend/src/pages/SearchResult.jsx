import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import Spinner from 'react-bootstrap/esm/Spinner';
import SearchClient from "../api/searchClient";
import TitleProcessor from "../data/title/titleProcessor";
import TitleResultsItemData from "../data/title/titleResultsItemData";
import TitleResultItem from "../components/TitleResultItem";
import TitleResultsProcessor from "../data/title/titleResultsProcessor";

const SearchResult = () => {
    const { token } = useAuth();
    const { searchParameters } = useParams();
    const [error, setError] = useState(null);
    const [loadingSearch, setLoadingSearch] = useState(true);
    const [titleSearchResultData, settitleSearchResult] = useState(new TitleResultsItemData());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchClient = new SearchClient();
                const titleResultsProcessor = new TitleResultsProcessor();
                const titleSearchResult = await searchClient.getTitleSearchResults(token, searchParameters);
                console.log(titleSearchResult);
                settitleSearchResult(titleSearchResult);
                setLoadingSearch(false);
            } catch (error) {
                setLoadingSearch(false);
                setError(error.message);
                console.error('error: ', error);
            }
        }
        fetchData();
    }
    , [token, searchParameters]);

    if (loadingSearch) {
        return <Spinner animation="border" role="status"> 
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    if (error) {
        return <p style={{color: 'red'}}>{error}</p>
    }

    return (
        <>
        <h1> Search Results for {searchParameters} </h1>
        </>
    );
}

export default SearchResult;