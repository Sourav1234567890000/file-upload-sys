import { useState } from "react";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";

const DashboardHome = () => {
  const location = useLocation();
  console.log(location.state);

  const userData = location.state?.user?.data;

  const email = userData?.email;
  const userName = userData?.userName;

  const [card, setCard] = useState([]);

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

  return (
    <div>
      <h1>Welcome : {userName}</h1>
      <p>Email : {email}</p>
      <button onClick={createCard}>+</button>
      {card.map((item, index) => (
        <Card
          key={index}
          stageName={item.stageName}
          applicantName={item.applicantName}
          location={item.location}
          loanAmount={item.loanAmount}
        />
      ))}
      {/* <button onClick={logout}></button> */}
    </div>
  );
};

export default DashboardHome;
