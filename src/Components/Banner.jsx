import React, { useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import Loader from "./Loader";

export default function Banner() {
  const { movies } = useContext(AuthContext);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        { movies.slice(0, 5).map((movie) => (
          <SwiperSlide key={movie._id}>
            <div
              className="w-full bg-cover h-[85vh] bg-center flex items-end rounded-2xl "
              style={{ backgroundImage: `url(${movie.posterUrl})` }}
            >
                <div className=" bg-black/30 rounded-2xl p-8 w-full max-sm:place-items-center flex flex-col">
                    <h2 className="text-4xl font-extrabold mb-4 max-sm:text-center">{movie.title}</h2>
                    <p className="text-lg max-w-2xl max-sm:hidden">{movie.plotSummary}</p>
                    <Link to={`/movies/${movie._id}`} className="ViewBtn mt-4 w-fit">View Details</Link>
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
