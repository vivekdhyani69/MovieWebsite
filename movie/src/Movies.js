import React from "react";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";
import "./App.css";
const Movies = () => {
  const { movie, isLoading } = useGlobalContext();
  if (isLoading) {
    //agr data load hua toh ye else me return vala
    return (
      <div className="">
        <div className="loading">Loading...</div>
      </div>
    );
  }
  return (
    <section className="movie-page">
      <div className=" container grid grid-4-col">
        {movie.map((curMovie) => {
          //movie map now we access all with curMovie
          const { imdbID, Title, Poster } = curMovie; //curMovie object se get kr liye many keys
          const moviName = Title.substring(0, 15);

          return (
            <NavLink to={`movie/${imdbID}`} key={imdbID}>
              <div className="card">
                <div className="card-info">
                  <h2>{moviName.length >= 15 ? `${moviName}...` : moviName}</h2>
                  <img src={Poster} alt={imdbID} />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Movies;
