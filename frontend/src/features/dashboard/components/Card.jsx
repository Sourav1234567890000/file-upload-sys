import React from "react";

const Card = ({ title, loanAmount }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{loanAmount}</div>
    </div>
  );
};

export default Card;
