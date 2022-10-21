import React, { Fragment } from 'react';
import OneData, { OneDataProps } from './OneData';

interface MultipleDataProps {
  dataArray: OneDataProps[];
}

const MultipleData = ({ dataArray }: MultipleDataProps) => (
  <Fragment>
    {dataArray.map((data, index) => (
      <OneData key={index} {...data} />
    ))}
  </Fragment>
);

export default MultipleData;
