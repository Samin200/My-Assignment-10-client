import axios from "axios";

import { auth } from "../Firebase/firebase.init";
import Swal from "sweetalert2";

import { useContext } from "react";


import { AuthContext } from "../Context/AuthContext";

const AddWatchlist = ({ movie }) => {
  const { fetchWatchlistMovies, setLoading } = useContext(AuthContext);

  const handleWatchlist = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `https://my-assignment-10-server-jet.vercel.app/users/watchlist?email=${auth.currentUser.email}`,
        { movie: { ...movie, _id: movie._id.toString() } }
      );

      Swal.fire({
        title: "Added To Watchlist!",
        icon: "success",
      });

      // Refresh context so Watchlist updates immediately
      fetchWatchlistMovies();
    } catch (err) {
      Swal.fire({
        title: "Failed to add!",
        text: err.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleWatchlist} className="btn btn-primary">
      Add To Watchlist
    </div>
  );
};
export default AddWatchlist;