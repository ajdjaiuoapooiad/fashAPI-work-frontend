import React from 'react';

const LoadingIcon: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-gray-600 mt-2">検索中...</p>
    </div>
  );
};

export default LoadingIcon;