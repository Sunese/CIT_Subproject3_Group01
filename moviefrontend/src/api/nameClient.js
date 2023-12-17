class NameClient {
  static async getNames(pageSize = 10, page = 0) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI +
          "/api/v1/name/" +
          "?pageSize=" +
          pageSize +
          "&page=" +
          page,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getName(nameID) {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI + "/api/v1/name/" + nameID,
      {
        method: "GET",
      }
    );
    return response;
  }

  static async getNameRating(nameID) {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI + "/api/v1/name/" + nameID + "/rating",
      {
        method: "GET",
      }
    );
    return response;
  }
  static async getPrimaryProfessions(nameID) {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI +
        "/api/v1/name/" +
        nameID +
        "/primaryProfessions",
      {
        method: "GET",
      }
    );
    return response;
  }
}
export default NameClient;
