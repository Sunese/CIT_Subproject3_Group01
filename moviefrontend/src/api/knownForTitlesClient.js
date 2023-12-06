class KnownForTitleClient {
  static async getKnownForTitles(nameId) {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI +
        "/api/v1/name/" +
        nameId +
        "/knownForTitles",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  }
}

export default KnownForTitleClient;
