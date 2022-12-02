import { useEffect, useState } from 'react';

interface StarsProps {
  rating: number;
}

const generateStarRatingOpacityArray = (rating: number) =>
  Array.from(Array(Math.floor(rating)).keys());

const Stars = ({ rating }: StarsProps) => {
  const [starOpacity, setStarOpacity] = useState(
    generateStarRatingOpacityArray(rating),
  );
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setStarOpacity(generateStarRatingOpacityArray(rating));
    setIsClicked(false);
  }, [rating]);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: 'flex',
        gap: 5,
      }}
    >
      {Array.from(Array(5).keys()).map((idx) => (
        <a
          key={idx}
          style={
            starOpacity.indexOf(idx) !== -1
              ? { opacity: '100%', cursor: 'pointer' }
              : { opacity: '50%', cursor: 'pointer' }
          }
          onClick={() => {
            setIsClicked(true);
            setStarOpacity(generateStarRatingOpacityArray(idx + 1));
          }}
          onMouseEnter={() => {
            setStarOpacity(generateStarRatingOpacityArray(idx + 1));
          }}
          onMouseLeave={() => {
            if (!isClicked)
              setStarOpacity(generateStarRatingOpacityArray(rating));
          }}
        >
          ⭐️
        </a>
      ))}
    </div>
  );
};

export default Stars;
