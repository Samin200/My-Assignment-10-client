import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { setLoading} = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    

    axios
      .get(`http://localhost:5020/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        
        setLoading(false);
      });
  }, [id, setLoading]);

  
  if (!movie) return <div className="p-6 text-center">Movie not found</div>;

  return (
    <div className="p-16 max-w-4xl mx-auto">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
      />
      <h1 className="text-3xl font-bold mt-6">{movie.title}</h1>
      <p className="text-lg text-gray-600 mt-2">
        {movie.genre} • {movie.releaseYear} • {movie.duration} min
      </p>
      <p className="mt-4 text-gray-700">{movie.plotSummary}</p>
      <div className="mt-4 space-y-1">
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Rating:</strong> {movie.rating} stars</p>
        
      </div>
    </div>
  );
};

export default MovieDetails;