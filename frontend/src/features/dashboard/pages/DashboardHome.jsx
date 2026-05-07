import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, []);
  
  return (
    <div>
      <h1>Welcome : {user?.username}</h1>
      <p>Email : {user?.email}</p>

      <Card
        stageName="applicant application"
        applicantName="sourav"
        location="banglore"
        loanAmount="50000"
      ></Card>
      <Card
        stageName="financial analyzer"
        applicantName="nirmal"
        location="warangal"
        loanAmount="30000"
      ></Card>
      <Card
        stageName="collateral check"
        applicantName="ankit"
        location="delhi"
        loanAmount="60000"
      ></Card>
      <button onClick={logout}></button>
    </div>
  );
};

export default DashboardHome;
