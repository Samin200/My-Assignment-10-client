import React from "react";
import Button from "../Components/Button";

const GetStarted = () => {
  return (
    <div className="  banner h-screen bg-cover bg-center flex justify-center items-center max-sm:px-4" >
      <div className="animate__animated animate__backInDown text-center bg-black/10 p-10 rounded-lg shadow-2xl shadow-rose-400">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Movie Master Pro
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto">
          Discover, organize, and enjoy your favorite movies all in one place. 
          Create your personal collection, explore top-rated films, and never miss 
          a cinematic masterpiece. Start your movie journey today!
        </p>
        <Button></Button>
      </div>
    </div>
  );
};

export default GetStarted;