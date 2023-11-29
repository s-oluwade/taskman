import React from 'react';

const ThreeDotLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-gray-700 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-gray-700 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-gray-700 rounded-full animate-bounce"></div>
    </div>
  );
};

export default ThreeDotLoader;