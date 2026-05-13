import React, { useState } from "react";
import UserCard from "./UserCard";

const Apps = () => {
  const [isOnline, setIsOnline] = useState(false);

  const handleMessage = (name, age, isOnline) => {
    console.log(`Sending message to : " ${name} whose age is ${age}`);
    setIsOnline(true);
    console.log("user status" + isOnline);
  };

  return (
    <div>
      <UserCard
        name="Sourav"
        age={1}
        isOnline={true}
        onMessage={handleMessage}
      />
      <UserCard
        name="Rahul"
        age={25}
        isOnline={false}
        onMessage={handleMessage}
      />
      <UserCard
        name="Priya"
        age={27}
        isOnline={true}
        onMessage={handleMessage}
      />
    </div>
  );
};

export default Apps;
