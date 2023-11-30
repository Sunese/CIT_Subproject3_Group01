import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import SearchClient from "../api/searchClient";
import TitleResultsProcessor from "../data/title/titleResultsProcessor";
import ResultsData from "../data/resultsData";
import { ApiParamsBuilder } from "../utils/urlBuilder";
import Paginator from "./Paginator";

const TitleSearch = () => {
    const { token } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resultsData, setResultsData] = useState(new ResultsData());

    let handleResponse = (searchResponse) => {
        if (!searchResponse.ok) {
            throw new Error('Error searching');
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log('Am i running twice TitleSearch?')
                const searchClient = new SearchClient();
                const titleResultsProcessor = new TitleResultsProcessor();
                const searchResponse = await searchClient.search(
                    token, 
                    ApiParamsBuilder(
                        'title',
                        searchParams.get('query'),
                        searchParams.get('titletype')));
                handleResponse(searchResponse);
                const responseData = await searchResponse.json();
                setResultsData(titleResultsProcessor.processPage(responseData));
                setLoading(false);
                    } 
                    catch (error) {
                        setError(error);
                        console.error('error: ', error);
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
        <h1>Titles:</h1>
        <Paginator page={resultsData} isTitles={true}/>
        </>
    )
}

export default TitleSearch;