import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidaData } from "../utils/validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch =useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async (event) => {
    event.preventDefault();

    const message = checkValidaData(
      email.current.value.trim(),
      password.current.value,
      !isSignInForm,
    );
    setErrorMessage(message);

    if (message) return;
    try {
      if (isSignInForm) {
        await signInWithEmailAndPassword(
          auth,
          email.current.value.trim(),
          password.current.value,
        );
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value.trim(),
          password.current.value,
        );
        const displayName = name.current.value.trim();

        if (displayName) {
          await updateProfile(userCredential.user, {
            displayName:name,current,value,
            photoURL:{USER_AVATAR},
          });
          then(() =>{
            const { uid, email, displayName, photoURL } = auth.currentUser;
                    dispatch(
                      addUser({ 
                        uid: uid,
                         email: email, 
                         displayName: displayName,
                          photoURL: photoURL ,
                        }));
          })
        }
      }
      
    } catch (error) {
      setErrorMessage(`${error.code}: ${error.message}`);
    }
  };

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
      <form
        onSubmit={handleButtonClick}
        className=" w-3/12 absolute rounded-lg  p-12 bg-black/60 my-36 mx-auto right-0 left-0">
        <h1 className="font-bold  text-white text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}{" "}
        </h1>

        {!isSignInForm && <input
          ref={name}
          type="text"
          placeholder="FullName"
          className="p-2 my-3 w-full rounded bg-gray-400"
        />}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-2 my-3 w-full rounded bg-gray-400"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-3 w-full rounded  bg-gray-400 "
        />
        <p className="text-red-500  text-center">{errorMessage}
        </p>

        <button type="submit" className="p-2 my-2 cursor-pointer text-white bg-red-700 w-full rounded-lg bg-opacity-">
          {isSignInForm ? "Sign In" : "SignUp"}
        </button>
        <p className="text-white  text-center my-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New to netflix ?signUp Now" : "Already registerd Login Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
