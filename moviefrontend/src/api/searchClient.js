class SearchClient {
    async getTitleSearchResults(searchTerm) {
        try {
            console.log('searchTerm:', searchTerm);
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URI
                + '/api/v1/search/title?query='
                + searchTerm, {
                    method: 'GET'
                });
            console.log('response:', response);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default SearchClient;