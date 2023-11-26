class TitleClient {
    async getTitles(pageSize = 10, page = 0) {
        try {
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URI
                + '/api/v1/title/'
                + '?pageSize=' + pageSize 
                + '&page=' + page, {
                    method: 'GET'
                });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getTitle(id) {
        try {
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URI
                + '/api/v1/title/' + id, {
                    method: 'GET'
                });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getFeatured() {
        try {
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URI
                + '/api/v1/title/featured', {
                    method: 'GET'
                });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}
export default TitleClient;