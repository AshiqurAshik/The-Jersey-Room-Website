import React from 'react';
import { Link } from 'react-router';
import { GiSoccerBall } from 'react-icons/gi';
import { HiArrowLeft } from 'react-icons/hi';

const Error = () => {
  return (
    <div className="min-h-screen bg-[#0B3D2E] flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 rounded-full bg-[#C8F169]/20 flex items-center justify-center animate-pulse">
            <GiSoccerBall className="text-[#C8F169] text-6xl" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-[#C8F169]">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-300 leading-7">
          Looks like this page has been transferred to another league.
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8F169] px-6 py-3 font-semibold text-[#0B3D2E] transition hover:bg-white"
          >
            <HiArrowLeft size={20} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-lg border border-[#C8F169] px-6 py-3 font-semibold text-[#C8F169] transition hover:bg-[#C8F169] hover:text-[#0B3D2E]"
          >
            Browse Jerseys
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;