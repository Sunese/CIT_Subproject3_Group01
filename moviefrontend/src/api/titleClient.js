class TitleClient {
  static async getTitles(pageSize = 10, page = 0) {
    console.log("getting titles");
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI +
          "/api/v1/title/" +
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

  static async getTitle(id) {
    console.log("getting title");
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + "/api/v1/title/" + id,
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

  static async getFeatured() {
    console.log("getting featured titles");
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + "/api/v1/title/featured",
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

  static async getHighestRated(days, page, pagesize) {
    try {
      let uri = process.env.REACT_APP_API_BASE_URI + "/api/v1/title/rating";
      uri += "?";
      uri += "&page=" + page;
      uri += "&pageSize=" + pagesize;
      if (days) {
        uri += "&days=" + days;
      }
      console.log(uri);
      const response = await fetch(uri, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  static async getTitleRatings(id) {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI + "/api/v1/title/" + id + "/rating",
      {
        method: "GET",
      }
    );
    return response;
  }
}
export default TitleClient;
