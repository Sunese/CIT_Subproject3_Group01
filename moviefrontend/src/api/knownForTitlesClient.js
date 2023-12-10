class KnownForTitleClient {
  static async getKnownForTitles(nameId) {
    const data = await fetch(
      process.env.REACT_APP_API_BASE_URI +
        "/api/v1/name/" +
        nameId +
        "/knownForTitles",
      {
        method: "GET",
      }
    );
    return data;
  }
}

export default KnownForTitleClient;
