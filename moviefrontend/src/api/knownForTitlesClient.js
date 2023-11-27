class KnownForTitleClient {
    async getKnownForTitles(nameId) {
        try {
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URI
                + '/api/v1/name/'
                + nameId
                + '/knownForTitles', {
                    method: 'GET'
                });
            const data = await response.json();
            console.log('data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default KnownForTitleClient;