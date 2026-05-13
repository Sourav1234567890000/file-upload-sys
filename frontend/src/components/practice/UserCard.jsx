import React from "react";

const UserCard = ({ name, age, isOnline, onMessage }) => {
  return (
    <div>
      {isOnline ? (
        <span style={{ backgroundColor: "green", padding: "4px 10px" }}>
          Online 🟢
        </span>
      ) : (
        <span>Offline 🔴</span>
      )}
      <button onClick={() => onMessage(name, age, isOnline)}>Send</button>
    </div>
  );
};

export default UserCard;
