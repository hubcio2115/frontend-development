import React from 'react';
import FancyTable from './FancyTable';

interface MultipleProps {
  name: string;
  n: number;
}

const Multiple = ({ name, n }: MultipleProps) => (
  <Fragment>
    <h1>{name}</h1>
    <FancyTable n={n} />
  </Fragment>
);

export default Multiple;
