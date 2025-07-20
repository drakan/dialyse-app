import React from 'react';

const StatCard = ({ label, count, color = 'text-blue-600', onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-200 min-w-[150px]"
    >
      <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
      <p className={`text-4xl font-bold mt-2 ${color}`}>{count}</p>
    </div>
  );
};

export default StatCard;
