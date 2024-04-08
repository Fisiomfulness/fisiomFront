import React from 'react';

const Star = ({ filled, onClick }) => {
  const starClass = filled ? 'text-yellow-500' : 'text-gray-300';

  return (
    <span
      className={`cursor-pointer text-1xl ${starClass}`}
      onClick={onClick}
    >
      ★
    </span>
  );
};

export default Star;
