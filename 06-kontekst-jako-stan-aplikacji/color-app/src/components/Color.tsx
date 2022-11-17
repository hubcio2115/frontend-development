import StarRating from './StarRating';
import { IColor, useColors } from './ColorProvider';
import { FaTrash } from 'react-icons/fa';

interface ColorProps extends IColor {}

const Color = ({ id, title, color, rating }: ColorProps) => {
  const { rateColor, removeColor } = useColors();

  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => removeColor!(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        selectedStars={rating}
        onRate={(rating: number) => rateColor!(id, rating)}
      />
    </section>
  );
};

export default Color;
