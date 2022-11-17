import { useContext } from 'react';
import { ColorContext } from '../context/ColorContext';

interface SecondaryHeadlineProps {
  content: string;
}

const SecondaryHeadline = ({ content }: SecondaryHeadlineProps) => {
  const color = useContext(ColorContext);

  return <h2 style={{ color }}>{content}</h2>;
};

export default SecondaryHeadline;
