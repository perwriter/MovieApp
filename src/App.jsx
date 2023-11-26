import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./Search.svg";
import Moviecard from "./Moviecard";
const API_URL = "http://www.omdbapi.com?apikey=c032e2d7";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search); // You can do something with the data here
  };
  useEffect(() => {
    searchMovies("Peter");
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };
  return (
    <div className="app">
      <h1>MovieApp</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for Movie"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Moviecard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
