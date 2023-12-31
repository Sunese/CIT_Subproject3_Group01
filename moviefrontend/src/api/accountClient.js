class AccountClient {
  static async signIn(username, password) {
    try {
      const signInModel = JSON.stringify({
        username: username,
        password: password,
      });
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + "/api/v1/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: signInModel,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async signUp(username, email, password, role) {
    // If no role is specified, default to User
    if (role === "") {
      role = "User";
    }
    try {
      const signUpModel = JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: role,
      });
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + "/api/v1/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: signUpModel,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getAccountInfo(username, token) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + `/api/v1/account/${username}`,
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

  static async updateEmail(username, token, newEmail) {
    try {
      const updateEmailModel = JSON.stringify({
        newEmail: newEmail,
      });
      const uri =
        process.env.REACT_APP_API_BASE_URI +
        `/api/v1/account/${username}/email`;
      const response = await fetch(uri, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: updateEmailModel,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async updatePassword(username, token, newPassword) {
    try {
      const updatePasswordModel = JSON.stringify({
        newPassword: newPassword,
      });
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI +
          `/api/v1/account/${username}/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: updatePasswordModel,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAccount(username, token) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URI + `/api/v1/account/${username}`,
        {
          method: "DELETE",
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
}

export default AccountClient;
