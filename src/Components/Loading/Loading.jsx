import React from 'react';
import { FaFutbol } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-[#0B3D2E] animate-spin"></div>

          <FaFutbol className="absolute text-3xl text-[#0B3D2E]" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
