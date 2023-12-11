import { useAuth } from "../utils/AuthContext";

class BookmarkClient {
  static async getTitleBookmarks(token, username, page = 0, pageSize = 10) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/titlebookmark/?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    console.log("response from client: ", response);
    return response;
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

  static async getTopRatedBookmarks(token, username, numberOfBookmarks = 4) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/titlebookmark/?orderBy=rating&pageSize=${numberOfBookmarks}`;
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
    if (notes === null) notes = "";
    const model = JSON.stringify({
      notes: notes,
      titleId: titleId,
    });
    console.log("add title bookmark POST request model: ", model);
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

  static async updateTitleBookmarkNote(token, username, titleId, newNote) {
    const model = JSON.stringify({
      notes: newNote,
    });
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/titlebookmark/${titleId}`;
    const response = await fetch(uri, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: model,
    });
    return response;
  }

  static async getNameBookmarks(token, username) {
    const uri =
      process.env.REACT_APP_API_BASE_URI + `/api/v1/${username}/namebookmark/`;
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  }

  static async getNameBookmark(token, username, nameId) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/namebookmark/${nameId}`;
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

  static async addNameBookmark(token, username, nameId, notes = "") {
    const model = JSON.stringify({
      notes: notes,
      nameId: nameId,
    });
    const uri =
      process.env.REACT_APP_API_BASE_URI + `/api/v1/${username}/namebookmark`;
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

  static async removeNameBookmark(token, username, nameId) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/namebookmark/${nameId}`;
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  }

  static async updateNameBookmarkNote(token, username, nameId, newNote) {
    const model = JSON.stringify({
      notes: newNote,
    });
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/namebookmark/${nameId}`;
    const response = await fetch(uri, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: model,
    });
    return response;
  }
}

export default BookmarkClient;
