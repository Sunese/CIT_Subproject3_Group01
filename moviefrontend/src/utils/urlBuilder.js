import React from 'react';
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

// builds the url after api call, handles pagination and search parameters
// "https://localhost:7293/api/v1/search/title?page=0&pageSize=10"
const UrlBuilder = () => {
    const [url, setUrl] = useState('');
    const { id } = useParams();

    const buildUrl = () => {
        setUrl(`http://localhost:3000/api/movies/${id}`);
    };

    return (
        <div>
            <button onClick={buildUrl}>Build URL</button>
            <p>{url}</p>
        </div>
    );
}

// gets the search parameters from the searchResults component
// creates the url string required for API requests
// searchClient.js handles base url and api version
// title?query=friends&titletype=movie
const ApiParamsBuilder = ( section, query, type ) => {
    let queryString = '';
    if (section != null) {
        queryString += section.toLowerCase() + '?';
    }
    if (query != null) {
        queryString += `query=${query}`;
    }
    if (type != null) {
        queryString += `&titletype=${type.toLowerCase()}`;
    }
    return queryString;
}


// gets the search parameters from the search form
// and builds the query string for the frontend
// output examples:
// title?query=spiderman
// title?query=spidermanasas&titletype=Short
// name?query=Tom%20Hanks
const searchParamsBuilder = ( Section, Query, Type ) => {
    let searchTerm = '';
    
    if (Section != '') {
        searchTerm += '?section=' + Section.toLowerCase() + '&';
    } else {
        searchTerm += '?';
    }

    searchTerm += `query=${Query}`;

    if (Type != "") {
        searchTerm = '?section=title' + `&query=${Query}` + `&titletype=${Type.toLowerCase()}`;
    }

    return searchTerm;
};

export { UrlBuilder, ApiParamsBuilder, searchParamsBuilder };
