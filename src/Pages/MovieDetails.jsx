import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import AddWatchlist from "../Components/AddWatchlist";

const MovieDetails = () => {
  const { id } = useParams();
  const { user, setLoading } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(7);

  // Fetch movie details
  const fetchMovie = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://my-assignment-10-server-jet.vercel.app/movies/${id}`
      );
      setMovie(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie)
    return <div className="p-6 text-center text-gray-500">Movie not found</div>;

  // --- Review Handlers ---
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login to add review");

    try {
      setLoading(true);
      await axios.post(
        `https://my-assignment-10-server-jet.vercel.app/movies/${id}/review`,
        {
          userId: user.uid,
          name: user.displayName || "Anonymous",
          photoURL:
            user.photoURL ||
            "https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png",
          text: reviewText,
          rating: reviewRating,
        }
      );
      setReviewText("");
      setReviewRating(5);
      fetchMovie(); // Refresh reviews
    } catch (err) {
      console.error(err);
      alert("Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  // --- Like / Dislike Handlers ---
  const handleLike = async () => {
    if (!user) return alert("Login to like");
    try {
      await axios.post(
        `https://my-assignment-10-server-jet.vercel.app/movies/${id}/like`,
        {
          userId: user.uid,
        }
      );
      fetchMovie();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert("Login to dislike");
    try {
      await axios.post(
        `https://my-assignment-10-server-jet.vercel.app/movies/${id}/dislike`,
        {
          userId: user.uid,
        }
      );
      fetchMovie();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 flex flex-col md:flex-row gap-8">
      {}
      <div className="shrink-0">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full max-w-sm rounded-xl shadow-xl border border-gray-200"
        />
      </div>

      {}
      <div className="flex-1 flex flex-col justify-between text-gray-200">
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="mt-2 text-gray-400 text-lg">
            {movie.genre} • {movie.releaseYear} • {movie.duration} min
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {movie.plotSummary}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-400">
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Cast:</strong> {movie.cast}
            </p>
            <p>
              <strong>Language:</strong> {movie.language}
            </p>
            <p>
              <strong>Country:</strong> {movie.country}
            </p>
            <p>
              <strong>Rating:</strong> {movie.rating} / 10
            </p>
          </div>

          {}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleLike}
              className={`btn ${
                movie.likes?.includes(user?.uid) ? "btn-primary" : "btn-ghost"
              }`}
            >
              👍 {movie.likes?.length || 0}
            </button>
            <button
              onClick={handleDislike}
              className={`btn ${
                movie.dislikes?.includes(user?.uid) ? "btn-error" : "btn-ghost"
              }`}
            >
              👎 {movie.dislikes?.length || 0}
            </button>
          </div>

          {}
          <div className="mt-4">
            <AddWatchlist movie={movie} />
          </div>

          {}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>

            {}
            {user && (
              <form
                onSubmit={handleAddReview}
                className="flex flex-col gap-3 mb-6 bg-gray-900 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={
                      user.photoURL ||
                      "https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png"
                    }
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <textarea
                    placeholder="Write a review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    className="textarea textarea-bordered flex-1 resize-none bg-gray-800 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <input
                    required
                    type="number"
                    min="1"
                    max="10"
                    placeholder="1 - 10"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                    className="input input-bordered w-24"
                  />
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            {}
            <div className="flex flex-col gap-4">
              {movie.reviews?.length > 0 ? (
                movie.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 bg-gray-900 rounded-lg shadow-sm border border-red-600"
                  >
                    <img
                      src={
                        rev.photoURL ||
                        "https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png"
                      }
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-white">{rev.name}</p>
                        <span className="text-yellow-400 font-semibold">
                          {rev.rating}/10
                        </span>
                      </div>
                      <p className="text-gray-300 mt-1">{rev.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;