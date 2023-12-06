import { useAuth } from "../utils/AuthContext";

class BookmarkClient {
  static async getTitleBookmarks(token, username) {
    try {
      const uri =
        process.env.REACT_APP_API_BASE_URI +
        `/api/v1/${username}/titlebookmark/`;
      const response = await fetch(uri, {
        method: "GET",
        Authorization: `${token}`,
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

  static async addTitleBookmark(token, username, titleId, notes = "") {
    const model = JSON.stringify({
      notes: notes,
      titleId: titleId,
    });
    const uri =
      process.env.REACT_APP_API_BASE_URI + `/api/v1/${username}/titlebookmark`;
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: model,
    });
    return response;
  }

  static async removeTitleBookmark(token, username, titleId) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/titlebookmark/${titleId}`;
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  }
}

export default BookmarkClient;
