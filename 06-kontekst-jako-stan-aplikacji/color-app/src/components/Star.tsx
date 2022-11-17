import { MouseEventHandler } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarProps {
  selected: boolean;
  onSelect: MouseEventHandler<SVGAElement>;
}

const Star = ({ selected = false, onSelect = (f: any) => f }: StarProps) => (
  <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} />
);

export default Star;
