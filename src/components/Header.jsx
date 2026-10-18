import { img_URL, LOGO } from "../utils/Constant"
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser,removeUser } from "../utils/userSlice";




const Header = () => {
  const dispatch =useDispatch();
  const navigate =useNavigate();
  const user =useSelector(store =>store.user);
  const handleSignOut =() =>{

  signOut(auth)
  .then(() => {
   
}).catch((error) => {
  navigate("/error")
});
}
useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({ 
            uid: uid,
             email: email, 
             displayName: displayName,
              photoURL: photoURL ,
            }));



            navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <header className="absolute left-0 top-0 z-10 w-full  bg-gradient-to-b from-black  px-8 py-2 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="Netflix"
      />
     { user&&<div className="flex p-2 items-center ">
        <img
        className="w-8 h-8 m-3 rounded-bl-3xl"
        alt="usericon"
        src={img_URL }
        />
        <button onClick={handleSignOut} className="bg-red-600  rounded-lg mx-4 px-4 cursor-pointer text-white h-8">
          SignOut
          </button>
      </div>}
    </header>
  )
}

export default Header
