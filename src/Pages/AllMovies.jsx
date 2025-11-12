import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import MovieCard from "../Components/MovieCard";
import { useLocation } from "react-router";


const AllMovies = () => {
  const { allMovies, setAllMovies, movies } = useContext(AuthContext);
  
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search")?.toLowerCase() || "";
  const genre = queryParams.get("genre")

 useEffect(() => {
  let filtered = movies;

  if (genre && genre.trim()) {
    filtered = filtered.filter((movie) =>
      movie.genre
        .split(", ")
        .map((g) => g.trim().toLowerCase())
        .includes(genre.toLowerCase())
    );
  }

  if (search && search.trim()) {
    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(search)
    );
  }

  setAllMovies(filtered);
}, [search, genre, movies, setAllMovies]);

  

  return (
    <div className="relative">
      <h2 className="text-2xl text-center md:text-4xl font-bold text-base-content px-4 mt-8 mb-4">
        All Movies
      </h2>

      {allMovies.length === 0 ? (
        
          <p className="text-center text-gray-500 my-10">No movies found.</p>
          
        
      ) : (
        <div className="place-items-center my-14 scrollbar-hide grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
          {allMovies.map((movie) => (
            <div
              key={movie._id}
              className="flex-none w-36 sm:w-40 md:w-44 lg:w-48 snap-center"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMovies;