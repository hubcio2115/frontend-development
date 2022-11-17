import { FaStar } from 'react-icons/fa';
import Star from './Star';

const createArray = (length: number) => [...Array(length)];

interface StarRatingProps {
  totalStars?: number;
  selectedStars: number;
  onRate: (rating: number) => void;
}

const StarRating = ({
  totalStars = 5,
  selectedStars = 0,
  onRate = (f) => f,
}: StarRatingProps) => (
  <>
    {createArray(totalStars).map((n, i) => (
      <Star
        key={i}
        selected={selectedStars > i}
        onSelect={() => onRate(i + 1)}
      />
    ))}
  </>
);

export default StarRating;
