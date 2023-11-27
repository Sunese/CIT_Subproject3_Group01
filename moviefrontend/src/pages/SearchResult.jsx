import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Spinner from 'react-bootstrap/esm/Spinner';
import SearchClient from "../api/searchClient";
import TitleProcessor from "../data/title/titleProcessor";
import TitleResultsItemData from "../data/title/titleResultsItemData";
import TitleResultItem from "../components/TitleResultItem";

const SearchResult = () => {
    const { searchParameters } = useParams();
    const [error, setError] = useState(null);
    const [loadingSearch, setLoadingSearch] = useState(true);
    const [titleSearchResultData, settitleSearchResult] = useState(new TitleResultsItemData());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchClient = new SearchClient();
                const titleProcessor = new TitleProcessor();
                const titleSearchResult = titleProcessor.processPage(await searchClient.getTitleSearchResults(searchParameters));
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
    , [searchParameters]);

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