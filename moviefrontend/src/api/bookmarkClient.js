import { useAuth } from "../utils/AuthContext";

class BookmarkClient {
  static async getTitleBookmarks(token, username) {
    try {
      const uri =
        process.env.REACT_APP_API_BASE_URI +
        `/api/v1/${username}/titlebookmark/`;
      console.log("uri: ", uri);
      const authHeader = { Authorization: `${token}` };
      console.log("authHeader: ", authHeader);
      const response = await fetch(uri, {
        method: "GET",
        headers: authHeader,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  static async getTitleBookmark(token, username, titleId) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/titlebookmark/${titleId}`;
    const authHeader = { Authorization: `${token}` };
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  }

  static async addTitleBookmark(token, username, titleId, notes) {
    const body = {
      titleId: titleId,
      notes: notes,
    };
    const uri =
      process.env.REACT_APP_API_BASE_URI + `/api/v1/${username}/titlebookmark`;
    const authHeader = { Authorization: `${token}` };
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authHeader,
      },
      body: JSON.stringify(body),
    });
    return response;
  }
}

export default BookmarkClient;
