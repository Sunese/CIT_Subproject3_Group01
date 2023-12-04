class KnownForTitleClient {
  static async getKnownForTitles(nameId) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI +
          "/api/v1/name/" +
          nameId +
          "/knownForTitles",
        {
          method: "GET",
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default KnownForTitleClient;
