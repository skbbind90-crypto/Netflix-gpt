import React from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/Constant";
import { useEffect } from "react";

function Browse() {

  const getNowPlayingMovies =async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const json = await data.json();
    console.log(json);
  };

  useEffect(() =>{
    getNowPlayingMovies();
  }, [])
  return (
    <>
    <Header/>
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl text-center pt-20 font-bold">Browse Page</h1>
  </div></>
    
  );
}

export default Browse;
