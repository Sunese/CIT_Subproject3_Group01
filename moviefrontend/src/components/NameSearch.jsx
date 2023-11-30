import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

import SearchClient from "../api/searchClient";
import NameResultsProcessor from "../data/name/nameResultsProcessor";
import ResultsData from "../data/resultsData";
import { ApiParamsBuilder } from "../utils/urlBuilder";
import Paginator from "./Paginator";

const NameSearch = () => {
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
                console.log('Am i running twice NameSearch?')
                const searchClient = new SearchClient();
                const nameResultsProcessor = new NameResultsProcessor();
                const searchResponse = await searchClient.search(
                    token, 
                    ApiParamsBuilder(
                        'name',
                        searchParams.get('query'),
                        searchParams.get('titletype')));
                handleResponse(searchResponse);
                const responseData = await searchResponse.json();
                setResultsData(nameResultsProcessor.processPage(responseData));
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
        <h1>Names:</h1>
        <Paginator page={resultsData} />
        </>
    )
}

export default NameSearch;