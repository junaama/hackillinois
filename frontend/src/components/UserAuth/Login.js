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
        .signInWithEmailAndPassword(userInfo.email.trim(), userInfo.password);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(userInfo)
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    history.push("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Or {}
            <div
              onClick={() => history.push("/register")}
              className="font-medium text-red-bold hover:text-red-deeper cursor-pointer"
            >
              register for an account
            </div>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="p-1">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="email"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-purple-normal placeholder-purple-lightest text-white rounded-md focus:outline-none focus:ring-purple-darker focus:border-purple-darker focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="p-1">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                required
                className="appearance-none  relative block w-full px-3 py-2 bg-purple-normal placeholder-purple-lightest text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="p-1">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-red-bold hover:bg-red-deeper focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-bold"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
