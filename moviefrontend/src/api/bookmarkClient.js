import { useAuth } from "../utils/AuthContext";

class BookmarkClient {
    async getTitleBookmarks(token, username) {
        try {
            const uri = process.env.REACT_APP_API_BASE_URI
            + `/api/v1/${username}/titlebookmark/`;
            console.log('uri: ', uri);
            const authHeader = {'Authorization': `${token}`};
            console.log('authHeader: ', authHeader);
            const response = await fetch(uri, {
                    method: 'GET',
                    headers: authHeader
                });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default BookmarkClient;