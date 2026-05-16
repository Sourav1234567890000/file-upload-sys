import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const location = useLocation();
  const submitDetails = location.state;

  const user = JSON.parse(localStorage.getItem("user"));
  const userData = user?.data;
  const email = userData?.email;
  const userName = userData?.userName;

  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (submitDetails) {
      setCards((prev) => [...prev, submitDetails]);
    }
    console.log(submitDetails);
  }, []);

  const openLoanForm = () => {
    console.log("card button clicked");
    navigate("/dashboard/applicat-form");
  };

  const startNewApplication = () => {
    navigate("/dashboard/new-application");
  };

  return (
    <div>
      <button onClick={startNewApplication}>New Application</button>
      {cards.map((item, index) => (
        <Card
          key={index}
          title={item.applicantName}
          loanAmount={item.applicantLoan}
          onClick={() => navigate("/dashboard/new-application")}
        />
      ))}
      <h1>Welcome : {userName}</h1>
      <p>Email : {email}</p>
    </div>
  );
};

export default DashboardHome;
