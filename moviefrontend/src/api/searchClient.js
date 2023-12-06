class SearchClient {
  static async titleSearch(token, searchTerm) {
    try {
      const authHeader = { Authorization: `${token}` };
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + "/api/v1/search/title?" + searchTerm,
        {
          method: "GET",
          headers: authHeader,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  static async nameSearch(token, searchTerm) {
    try {
      const authHeader = { Authorization: `${token}` };
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + "/api/v1/search/name?" + searchTerm,
        {
          method: "GET",
          headers: authHeader,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  static async searchHistory(token, pagenation) {
    try {
      const authHeader = { Authorization: `${token}` };
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI 
        + "/api/v1/search/history"
        + pagenation,
        {
          method: "GET",
          headers: authHeader,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default SearchClient;
