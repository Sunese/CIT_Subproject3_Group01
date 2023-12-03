class SearchClient {
  static async getTitleSearchResults(token, searchTerm) {
    try {
      console.log("searchTerm:", searchTerm);
      const authHeader = { Authorization: `${token}` };
      console.log("authHeader:", authHeader);
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI +
          "/api/v1/search/title?query=" +
          searchTerm,
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
