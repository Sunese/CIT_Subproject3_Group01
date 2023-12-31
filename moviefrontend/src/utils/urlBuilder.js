
// gets the data after the equals sign in the input part of the url
// example: "https://localhost:7293/api/v1/search/title?query=friends&titletype=movie&page=0&pageSize=10"
// input: tityletype
// output: movie
// input: page
// output: 0
const GetUrlParamRegex = ( url, paramater ) => {
    if (url == null || paramater == null) {
        return null;
    }
    let regex = new RegExp( paramater + '=([^&]*)' );
    let match = url.match( regex );
    if (match) {
        return match[1];
    } else {
        return null;
    }
}

// builds the url for api calls, handles pagination and search parameters
// "https://localhost:7293/api/v1/search/title?page=0&pageSize=10&query=mike"
const PaginationUrlBuilder = (page, pageSize, query, type) => {
    let url = '';
    if (page != null) {
        url += `&page=${page}`;
    }
    if (pageSize != null) {
        url += `&pageSize=${pageSize}`;
    }
    if (query != null) {
        url += `&query=${query}`;
    }
    if (type != null) {
        url += `&titletype=${type.toLowerCase()}`;
    }
    return url;
}

// gets the search parameters from the searchResults component
// creates the url string required for API requests
// searchClient.js handles base url and api version
// title?query=friends&titletype=movie
const ApiParamsBuilder = (query, type ) => {
    let queryString = '';
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

export { GetUrlParamRegex, PaginationUrlBuilder, ApiParamsBuilder, searchParamsBuilder };
