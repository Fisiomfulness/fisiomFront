'use client';
import dynamic from 'next/dynamic';
const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});

const Rating = ({ value, setFieldValue }) => {
  // ? Works with formik => changing the value of the formik state field.
  const handleRatingChange = (newRating) => {
    setFieldValue('rating', newRating);
  };
  return (
    <div>
      <div>
        <StarRatings
          starRatedColor="#ffb829"
          starHoverColor="#ffb829"
          isSelectable={true}
          rating={value}
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
