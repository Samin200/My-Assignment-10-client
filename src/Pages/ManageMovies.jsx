import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useParams, useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { auth } from "../Firebase/firebase.init";

const ManageMovie = () => {
  const { movies, setMovies } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m._id === id);



  
  // Redirect if movie not found
  useEffect(() => {
    if (!movie) {
      Swal.fire({
        icon: "warning",
        title: "Movie not found",
        text: "The movie you are trying to access does not exist.",
      }).then(() => {
        navigate("/my-collection");
      });
    }
  }, [movie, navigate]);

  if (!movie) return null; // Prevent rendering before redirect

  const handleEdit = () => {
    navigate(`/movies/update/${id}`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:5020/movies/${id}`, { method: "DELETE" });

        setMovies(movies.filter((m) => m._id !== id));

        Swal.fire("Deleted!", "Movie has been deleted.", "success").then(() => {
          navigate("/my-collection");
        });
      } catch (err) {
        Swal.fire("Error!", "Failed to delete movie: " + err.message, "error");
      }
    }
  };

  // check ownership
if (!movie) return <p className="text-center mt-10">Movie not found</p>;
if (movie.addedBy !== auth.currentUser.email) {
  return <p className="text-center mt-10 text-red-500 flex justify-center items-center relative h-[60vh]"><p>You are not allowed to manage this movie.</p></p>;
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="shadow-lg rounded-lg w-full max-w-lg p-6">
        <Link to={'/my-collection'} className="flex items-center gap-2 group cursor-pointer mb-4">
      {/* circular arrow */}
      <span className="relative w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-200 transition-colors duration-300 group-hover:border-red-500">
        <svg
          className="w-4 h-4 fill-gray-200 rotate-180"
          viewBox="0 0 46 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
        </svg>
      </span>

      {/* text */}
      <span className="font-medium text-base-content transition-colors duration-300 group-hover:text-red-500">
        Go Back
      </span>
    </Link>
        <h2 className="text-2xl font-bold mb-4 text-center text-base-content">
          {movie.title}
        </h2>

        <div className="mb-4">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="rounded-lg mx-auto mb-4"
          />
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Year:</strong> {movie.releaseYear}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Cast:</strong> {movie.cast}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Duration:</strong> {movie.duration} min</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Country:</strong> {movie.country}</p>
          <p className="mt-2">{movie.plotSummary}</p>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={handleEdit} className="btn btn-primary">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMovie;