class UpdatePageClient {
  static async updateTitles(token, apiParams) {
    try {
      const authHeader = { Authorization: `${token}` };
      const response = fetch(
        process.env.REACT_APP_API_BASE_URI +
          "/api/v1/search/title?" +
          apiParams,
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

  static async updateNames(token, apiParams) {
    try {
      const authHeader = { Authorization: `${token}` };
      const response = fetch(
        process.env.REACT_APP_API_BASE_URI + "/api/v1/search/name?" + apiParams,
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
export default UpdatePageClient;
