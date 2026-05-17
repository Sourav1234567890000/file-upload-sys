import React from "react";

const Card = ({ title, loanAmount, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px 0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        width: "250px",
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
        {title}
      </div>

      <div style={{ fontSize: "14px", color: "#555" }}>
        Loan Amount: ₹{loanAmount}
      </div>
    </div>
  );
};

export default Card;
