import React, { createContext, useState } from "react";

let timeout;

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
});
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const durationTime = adjExpirationTime - currentTime;

  return durationTime;
};
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    const remainingTime = calculateRemainingTime(expirationTime);
    timeout = setTimeout(logoutHandler, remainingTime);
  };
  const valueContext = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logIn: loginHandler,
    logOut: logoutHandler,
  };
  return (
    <AuthContext.Provider value={valueContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
