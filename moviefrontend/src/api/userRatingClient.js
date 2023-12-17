class UserRatingClient {
  static async getUserRating(username, token, titleid) {
    // Get rating for specific title from user
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI +
        `/api/v1/${username}/titlerating/${titleid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response;
  }

  static async getUserRatings(username, token, page = 0, pageSize = 10) {
    // Get all ratings for user
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI +
          `/api/v1/${username}/titlerating?page=${page}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async createUserRating(username, token, titleid, rating) {
    // Create rating for specific title from user
    const body = {
      titleID: titleid,
      rating: rating,
    };
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI + `/api/v1/${username}/titlerating/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  }

  static async updateUserRating(username, token, titleid, rating) {
    const body = {
      titleID: titleid,
      rating: rating,
    };
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI +
        `/api/v1/${username}/titlerating/${titleid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  }

  static async deleteUserRating(username, token, titleid) {
    // Delete rating for specific title from user
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URI +
        `/api/v1/${username}/titlerating/${titleid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response;
  }
}

export default UserRatingClient;
