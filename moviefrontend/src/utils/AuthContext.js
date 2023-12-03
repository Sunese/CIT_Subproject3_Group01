import React from "react";
import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  token: "",
  username: "",
};

const authReducer = (state, action) => {
  console.log("Auth reducer called with action: ", action);
  switch (action.type) {
    case "LOGIN":
      console.log("Updating login context for: ", action.payload.username);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        username: action.payload.username,
      };
    case "LOGOUT":
      console.log("Updating logout context for: ", state.username);
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        username: "",
      };
    default:
      throw Error(`Unexpected action type: ${action.type}`);
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token, username) => {
    dispatch({ type: "LOGIN", payload: { token, username } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.any,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
