//**Renders Login Page */

import React, { useState, useCallback, useContext } from "react";
import firebase from "../../firebase";
import { AuthContext } from "./FirebaseAuth";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }, []);
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    history.push("/dashboard");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" onChange={handleChange} name="email" />

        <label>Password</label>
        <input type="password" onChange={handleChange} name="password" />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
