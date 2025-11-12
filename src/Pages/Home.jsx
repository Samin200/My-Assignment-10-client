import { useContext } from "react";
import Banner from "../Components/Banner";
import SearchBar from "../Components/SearchBar";
import Status from "../Components/Status";
import { AuthContext } from "../Context/AuthContext";
import MovieCard from "../Components/MovieCard";
import { Scrollbar } from "swiper/modules";
import AboutPlatform from "../Components/AboutPlatform";
import { useNavigate } from "react-router";

const Home = () => {

  const { movies } = useContext(AuthContext);
  const navigate = useNavigate()
  const genreFilter = (genre) => {

    navigate(`/allmovies?genre=${genre}`)
  }

  return (
    <div className=" bg-base-100">
      <div className=" sm:mx-18 sm:mt-6 mb-12">
        <Banner></Banner>
      </div>
      <Status></Status>
      <div className=" mb-5 mx-7 flex flex-col gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content px-4 mt-8 mb-4">
          Top Rated Movies
        </h2>
        <div className="relative">
          <div className="scrollbar-hide flex gap-3 overflow-x-auto overflow-y-hidden px-4 snap-x snap-mandatory">
            {movies
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 7)
              .map((movie) => (
                <div
                  key={movie._id}
                  className="flex-none w-36 sm:w-40 md:w-44 lg:w-48 snap-center"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
          </div>

          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-base-100 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-base-100 to-transparent" />
        </div>
      </div>
      <div className=" mb-5 mx-7 flex flex-col gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content px-4 mt-8 mb-4">
          Latest Movies
        </h2>
        <div className="relative">
          <div className="scrollbar-hide flex gap-3 overflow-x-auto overflow-y-hidden px-4 snap-x snap-mandatory">
            {movies
              .sort((a, b) => b.releaseYear - a.releaseYear)
              .slice(0, 7)
              .map((movie) => (
                <div
                  key={movie._id}
                  className="flex-none w-36 sm:w-40 md:w-44 lg:w-48 snap-center"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
          </div>

          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-base-100 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-base-100 to-transparent" />
        </div>
      </div>
      <div className="reltive">
        <div className=" flex mx-7 mb-5 scrollbar-hide overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-3">
          {[
            ...new Set(
              movies.flatMap((movie) =>
                movie.genre.split(", ").map((g) => g.trim())
              )
            ),
          ]
            
            .map((genre, index) => (
              <div onClick={() => {genreFilter(genre)}} className="genre flex-none w-fit snap-center " key={index}>
                {genre}
              </div>
            ))}
        </div>
      </div>
      <AboutPlatform></AboutPlatform>
    </div>
  );
};

export default Home;
