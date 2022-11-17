import { useContext } from 'react';
import { ColorContext } from '../context/ColorContext';

const PrimaryHeadline = () => {
  const color = useContext(ColorContext);

  return <h1 style={{ color }}>PrimaryHeadline</h1>;
};

export default PrimaryHeadline;
