const Star = ({ fill }) => <span className={`text-1xl ${fill}`}>★</span>;

const Stars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? "text-yellow-500" : "text-gray-300"
  );

  return (
    <div className="flex">
      {stars.map((fill, index) => (
        <Star key={index} fill={fill} />
      ))}
    </div>
  );
};

export default Stars;
