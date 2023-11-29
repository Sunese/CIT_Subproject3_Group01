class AccountClient {
  async SignIn(username, password) {
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
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async SignUp(username, email, password, role) {
    if (role === "") {
      role = "User";
    }
    try {
      console.log("client signin up username:", username);
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
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async GetAccountInfo(username, token) {
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
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async UpdateEmail(username, token, newEmail) {
    try {
      const updateEmailModel = JSON.stringify({
        newEmail: newEmail,
      });
      const uri =
        process.env.REACT_APP_API_BASE_URI +
        `/api/v1/account/${username}/email`;
      console.log("uri:", uri);
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
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async UpdatePassword(username, token, newPassword) {
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
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default AccountClient;
