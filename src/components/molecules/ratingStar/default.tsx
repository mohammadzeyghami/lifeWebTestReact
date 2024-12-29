import React from "react";

interface ReadOnlyStarRatingProps {
  rating: number; // current rating
  starCount?: number; // number of stars to display
}

const ReadOnlyStarRating: React.FC<ReadOnlyStarRatingProps> = ({
  rating,
  starCount = 5, // default to 5 stars
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const isActive = i < Math.floor(rating);
      const isHalfActive =
        rating - Math.floor(rating) >= 0.5 && i === Math.floor(rating);
      const starStyle = isActive
        ? "text-yellow-500"
        : isHalfActive
        ? "text-yellow-400"
        : "text-gray-300";

      stars.push(
        <span key={i} className={`text-2xl ${starStyle}`}>
          {isActive || isHalfActive ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default ReadOnlyStarRating;
