import React from "react";

const UserCard = ({ name, age, isOnline, onMessage }) => {
  function bankAccount(balance) {
    function deposit() {
     const deposit =  this.balance + 1000;
      console.log("deposit : ", deposit);
    }

    function withdraw() {
      const withdraw = this.balance - 1000
      console.log("withdraw : ", withdraw);
    }
    function getBalance() {
      console.log("Balance :", this.balance);
    }
  }

  bankAccount(3000);
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
