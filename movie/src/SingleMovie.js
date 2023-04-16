import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { Api_Url } from "./context";
import { useState, useEffect } from "react";
//import api in this component
const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovie = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //jesa component reload hoga vesa ek br ye useEffect chlega
    const timerOut = setTimeout(() => {
      getMovie(`${Api_Url}&i= ${id}`);
    }, 800);

    return () => clearTimeout(timerOut);
  }, [id]);

  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    );
  }
  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt="" />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className="card-text">{movie.Released}</p>
            <p className="card-text">{movie.Genre}</p>
            <p className="card-text">{movie.imdbRating}/10</p>
            <p className="card-text">{movie.Country}</p>
            <NavLink to="/" className="back-btn">
              Go-back
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleMovie;
