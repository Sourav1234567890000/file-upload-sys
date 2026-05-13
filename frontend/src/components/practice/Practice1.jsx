import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Practice1 = ({ reset }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setCount(0);
  }, [reset]);

  return (
    <div>
      <div>{count}</div>
    </div>
  );
};

export default Practice1;
