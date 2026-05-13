import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const location = useLocation();
  console.log(location.state);
  const userData = location.state?.user?.data;
  const email = userData?.email;
  const userName = userData?.userName;

  const [card, setCard] = useState([]);
  const navigate = useNavigate();

  const newCard = {
    stageName: "applicant application",
    applicantName: "sourav",
    location: "banglore",
    loanAmount: "50000",
  };

  const createCard = () => {
    console.log("button is clicked");
    setCard([...card, newCard]);
  };

  const openLoanForm = () => {
    console.log("card button clicked");
    navigate("/dashboard/applicat-form");
  };

  return (
    <div>
      <h1>Welcome : {userName}</h1>
      <p>Email : {email}</p>
      <button onClick={createCard}>+</button>
      {card.map((item, index) => (
        <button key={index} onClick={openLoanForm}>
          <Card
            stageName={item.stageName}
            applicantName={item.applicantName}
            location={item.location}
            loanAmount={item.loanAmount}
          />
        </button>
      ))}
      {/* <button onClick={logout}></button> */}
    </div>
  );
};

export default DashboardHome;
