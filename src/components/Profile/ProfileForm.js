import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const inputPasswordRef = useRef();
  const cartCtx = useContext(AuthContext);
  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = inputPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBK8c1K6IV5Y7V48IpNeew-OPKzk00SFzU",
      {
        method: "POST",
        body: JSON.stringify({
          password: enteredPassword,
          returnSecureToken: false,
          idToken: cartCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
      } else {
        history.replace("/");
      }
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={inputPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
