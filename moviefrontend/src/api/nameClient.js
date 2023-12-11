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
      console.error("Error fetching data:", error);
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
}
export default NameClient;
