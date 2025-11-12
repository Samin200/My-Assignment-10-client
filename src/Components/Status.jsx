import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Status = () => {
  const { totalUser, movies } = useContext(AuthContext);

  return (
    <section className="py-16 bg-base-200 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Platform Statistics</h2>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <p className="text-4xl font-extrabold">{movies.length}</p>
            <p className="mt-2 text-gray-400">Total Movies</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <p className="text-4xl font-extrabold">{totalUser.length}</p>
            <p className="mt-2 text-gray-400">Total Users</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <p className="text-4xl font-extrabold">
              {
                [
                  ...new Set(
                    movies.flatMap((movie) =>
                      movie.genre.split(", ").map((g) => g.trim())
                    )
                  ),
                ].length
              }
            </p>
            <p className="mt-2 text-gray-400">Genres</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Status;
