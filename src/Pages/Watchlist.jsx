import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import MovieCard from "../Components/MovieCard";

import { Link } from "react-router";
import { auth } from "../Firebase/firebase.init";

const Watchlist = () => {
  const { watchlist, isFetching } = useContext(AuthContext);

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Please Login to Access Watchlist
        </h2>
        <p className="mb-6 text-gray-600">
          You need an account to view your watchlist. Sign up if you don't have
          one.
        </p>
        <div className="flex gap-4">
          <Link to="/login_signup" className="btn btn-primary">
            Login / SignUp
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <h2 className="text-2xl text-center md:text-4xl font-bold text-base-content px-4 mt-8 mb-4">
        Your Watchlist
      </h2>

      {isFetching ? (
        <p className="text-center text-gray-500 my-10">Loading...</p>
      ) : watchlist.length === 0 ? (
        <p className="text-center text-gray-500 my-10">No movies found.</p>
      ) : (
        <div className="place-items-center my-14 scrollbar-hide grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
          {watchlist.map((movie) => (
            <div
              key={movie._id}
              className="flex-none w-39 sm:w-40 md:w-44 lg:w-48 snap-center"
            >
              
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Watchlist;
