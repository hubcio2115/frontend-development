import React from 'react';

export interface OneDataProps {
  image: string;
  cardTitle: string;
  cardDescription: string;
  button: {
    url: string;
    label: string;
  };
}

const OneData = ({
  image,
  cardTitle,
  cardDescription,
  button,
}: OneDataProps) => (
  <div className="card m-5">
    <img className="card-img-top" src={image} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">{cardTitle}</h5>
      <p className="card-text">{cardDescription}</p>
      <a href={button.url} className="btn btn-primary">
        {button.label}
      </a>
    </div>
  </div>
);

export default OneData;
