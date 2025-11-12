import React from "react";

const AboutPlatform = () => {
  return (
    <section className="py-20 bg-gray-900/60 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">About MovieMaster Pro</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          <span className="font-semibold text-red-500">MovieMaster Pro</span> is your all-in-one movie management platform — 
          browse, rate, and organize your favorite films effortlessly with real-time updates and curated collections. 
          Discover top-rated movies, explore the latest releases, and manage your watchlist seamlessly, all in one beautiful and interactive interface.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <div className="bg-gray-800/50 p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 w-64">
            <h3 className="text-xl font-semibold text-red-400 mb-2">Real-Time Updates</h3>
            <p className="text-gray-400 text-sm">Stay up-to-date with the latest movie data fetched directly from our live database.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 w-64">
            <h3 className="text-xl font-semibold text-red-400 mb-2">Smart Recommendations</h3>
            <p className="text-gray-400 text-sm">Discover movies tailored to your preferences based on ratings and genres.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 w-64">
            <h3 className="text-xl font-semibold text-red-400 mb-2">Custom Collections</h3>
            <p className="text-gray-400 text-sm">Create and manage your own personalized movie lists and categories with ease.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;