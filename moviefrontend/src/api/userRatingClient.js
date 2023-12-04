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

  static async getUserRatings(username, token) {
    // Get all ratings for user
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + `/api/v1/${username}/titlerating`,
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
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  static async createUserRating(username, token, titleid, rating) {
    // Create rating for specific title from user
    const body = {
      titleId: titleid,
      rating: rating,
    };
    console.log("create rating body: ", body);
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
      titleId: titleid,
      rating: rating,
    };
    console.log("update rating body: ", body);
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
