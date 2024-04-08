"use client";
import React, { useState } from 'react';
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const Rating = () => {
  const [rating, setRating] = useState(0);


  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <div>
     
      <div >
      <StarRatings
            starRatedColor="#ffb829"
            starHoverColor="#ffb829"
            isSelectable={true}
            rating={rating}
            changeRating={handleRatingChange}
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
            name="rating"
          />
      </div>
    </div>
  );
};

export default Rating;
