import { useContext } from 'react';
import { ColorContext } from '../context/ColorContext';

interface ParagraphProps {
  content: string;
}

const Paragraph = ({ content }: ParagraphProps) => {
  const color = useContext(ColorContext);

  return <p style={{ color }}>{content}</p>;
};

export default Paragraph;
