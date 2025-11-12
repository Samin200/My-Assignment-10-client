import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group relative w-48 cursor-pointer transition-all duration-300 hover:z-10 hover:scale-110"
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-72 object-cover rounded-xl"  // 👈 fixed height here
          loading="lazy"
        />

        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
          <FaStar /> {movie.rating}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg">{movie.title}</h3>
          <p className="text-neutral-300 text-sm">
            Movie • {movie.releaseYear} • {movie.duration} min
          </p>
        </div>
      </div>

      <h3 className="mt-3 text-base-content font-semibold text-lg truncate">
        {movie.title}
      </h3>
    </Link>
  );
};

export default MovieCard;