//**Renders Register Page */

import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import firebase from '../../firebase'
const Register = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
        history.push('/')
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input onChange={handleChange} name="email" type="text" />

        <label>Password</label>
        <input onChange={handleChange} name="password" type="password" />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
