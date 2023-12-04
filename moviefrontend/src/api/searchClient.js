class SearchClient {
  static async search(token, searchTerm) {
    try {
      const authHeader = { Authorization: `${token}` };
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + "/api/v1/search/" + searchTerm,
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
