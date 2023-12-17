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
    return response;
  }

  static async getTitleBookmark(token, username, titleID) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/titlebookmark/${titleID}`;
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

  static async addTitleBookmark(token, username, titleID, notes = "") {
    if (notes === null) notes = "";
    const model = JSON.stringify({
      notes: notes,
      titleID: titleID,
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

  static async removeTitleBookmark(token, username, titleID) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/titlebookmark/${titleID}`;
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  }

  static async updateTitleBookmarkNote(token, username, titleID, newNote) {
    if (newNote === null) newNote = "";
    const model = JSON.stringify({
      notes: newNote,
    });
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/titlebookmark/${titleID}`;
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

  static async getNameBookmarks(token, username, page = 0, pageSize = 10) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/namebookmark/?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  }

  static async getNameBookmark(token, username, nameID) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/namebookmark/${nameID}`;
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

  static async addNameBookmark(token, username, nameID, notes = "") {
    if (notes === null) notes = "";
    const model = JSON.stringify({
      notes: notes,
      nameID: nameID,
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

  static async removeNameBookmark(token, username, nameID) {
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/namebookmark/${nameID}`;
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  }

  static async updateNameBookmarkNote(token, username, nameID, newNote) {
    if (newNote === null) newNote = "";
    const model = JSON.stringify({
      notes: newNote,
    });
    const uri =
      process.env.REACT_APP_API_BASE_URI +
      `/api/v1/${username}/namebookmark/${nameID}`;
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
