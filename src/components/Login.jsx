import React from "react";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
          alt="logo"
        />
      </div>
      <form className=" w-3/12 absolute  p-12 bg-black/90 my-36 mx-auto right-0 left-0">
        <h1 className="font-bold  text-white text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}{" "}
        </h1>

      {!isSignInForm && <input
          type="text"
          placeholder="FullName"
          className="p-2 my-3 w-full rounded bg-gray-400"
        />}
        <input
          type="email"
          placeholder="Email Address"
          className="p-2 my-3 w-full rounded bg-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 my-3 w-full rounded  bg-gray-400 "
        />

        <button className="p-2 my-2 cursor-pointer text-white bg-red-700 w-full rounded-lg bg-opacity-">
        { isSignInForm ? "Sign In": "SignUp"}
        </button>
        <p className="text-white  text-center my-4 cursor-pointer" onClick={toggleSignInForm}>
          { isSignInForm?"New to netflix ?signUp Now":"Already registerd Login Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
