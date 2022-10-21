import React from 'react';

interface FancyTableProps {
  n: number;
}

const FancyTable = ({ n }: FancyTableProps) =>
  n > 0 ? (
    <ol>
      {[...Array(n).keys()].map((el, index) => (
        <li key={index}></li>
      ))}
    </ol>
  ) : (
    <></>
  );

export default FancyTable;
