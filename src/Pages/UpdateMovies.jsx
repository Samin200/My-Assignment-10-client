import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const UpdateMovies = () => {
  const { user, setMovies ,setLoading ,movies} = useContext(AuthContext);
  const navigate = useNavigate();
const [movieDetail , setMovieDetail] = useState(null)
const {id} = useParams()
useEffect(() => {
  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://my-assignment-10-server-jet.vercel.app/movies/${id}`
      );
      setMovieDetail(res.data); // store actual movie data
    } catch (err) {
      console.error("Error fetching movie detail:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDetail();
}, [id, setLoading]);

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
  });


  useEffect(() => {
    if (movieDetail) {
      setMovie({
        title: movieDetail.title || "",
        genre: movieDetail.genre || "",
        releaseYear: movieDetail.releaseYear || "",
        director: movieDetail.director || "",
        cast: movieDetail.cast || "",
        rating: movieDetail.rating || "",
        duration: movieDetail.duration || "",
        plotSummary: movieDetail.plotSummary || "",
        posterUrl: movieDetail.posterUrl || "",
        language: movieDetail.language || "",
        country: movieDetail.country || "",
      });
    }
  }, [movieDetail]);

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setMovie({ ...movie, [name]: value });
    } finally {
      console.log(movie);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user?.email) {
    Swal.fire("Error", "You must be logged in to edit a movie.", "error");
    return;
  }

  const updatedMovie = { ...movie, addedBy: user.email };

  try {
    await axios.patch(
      `https://my-assignment-10-server-jet.vercel.app/movies/${id}`,
      updatedMovie
    );

    Swal.fire({
      icon: "success",
      title: "Movie Updated Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    setMovies(
      movies.map((m) => (m._id === id ? { ...m, ...updatedMovie } : m))
    );

    navigate("/my-collection");
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <div className="card w-full max-w-lg shadow-xl bg-base-100 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Movies</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={movie.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={movie.genre}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            value={movie.releaseYear}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={movie.director}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="cast"
            placeholder="Cast"
            value={movie.cast}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating (1–10)"
            value={movie.rating}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="1"
            max="10"
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={movie.duration}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="plotSummary"
            placeholder="Plot Summary"
            value={movie.plotSummary}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
          <input
            type="url"
            name="posterUrl"
            placeholder="Poster URL"
            value={movie.posterUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={movie.language}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={movie.country}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <button type="submit" className="btn btn-primary w-full mt-4">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovies;
