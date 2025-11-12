import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import MovieCard from "../Components/MovieCard";
import { useNavigate } from "react-router";

const MyCollection = () => {
  const { movies, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Filter movies added by the logged-in user
  const myMovies = movies.filter((movie) => movie.addedBy === user?.email);

  const handleCardClick = (id) => {
    navigate(`/movies/manage/${id}`);
  };

  return (
    <div className="relative">
      <h2 className="text-2xl text-center md:text-4xl font-bold text-base-content px-4 mt-8 mb-4">
        My Collection
      </h2>
      <p className="text-center font-bold text-gray-300">Click on movie which you want to edit</p>

      {myMovies.length === 0 ? (
        <p className="text-center text-gray-500 my-10">
          You haven’t added any movies yet.
        </p>
      ) : (
        <div className="place-items-center my-14 scrollbar-hide grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
          {myMovies.map((movie) => (
            <div
              key={movie._id}
              className="flex-none w-36 sm:w-40 md:w-44 lg:w-48 snap-center cursor-pointer"
              onClick={() => handleCardClick(movie._id)}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollection;