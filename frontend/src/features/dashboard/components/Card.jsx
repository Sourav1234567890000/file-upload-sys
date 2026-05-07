import React from "react";

const Card = ({ stageName, applicantName, location, loanAmount }) => {
  return (
    <div>
      <div>{stageName}</div>
      <div>{applicantName}</div>
      <div>{location}</div> - <span>{loanAmount}</span>
    </div>
  );
};

export default Card;
