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
  const [cardsCount, setCardsCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/loan/dashboard/totalApplicants-count",
          {
            method: "GET",
          },
        );

        const data = await response.json();

        const totalCounts = data.totalApplicantCount;

        setCardsCount(totalCounts);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/loan/dashboard/applicantDetails",
          {
            method: "GET",
          },
        );

        const data = await response.json();
        setCards(
          data.applicantDetails.map((item) => ({
            applicantName: item.firstName,
            applicantLoan: item.loanAmount,
            id: item._id,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
      <h1>DASHBOARD </h1>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#222",
          marginBottom: "5px",
        }}
      >
        Welcome : {userName}
      </h1>

      <p
        style={{
          fontSize: "16px",
          color: "#555",
          marginTop: "0",
        }}
      >
        Email : {email}
      </p>
      <button onClick={startNewApplication}>New Application</button>
      <br></br>
      <br></br>
      <span
        style={{
          fontSize: "28px",
          fontWeight: "600",
          color: "#1a73e8",
          marginLeft: "10px",
          padding: "4px 8px",
          borderRadius: "6px",
          backgroundColor: "#e8f0fe",
        }}
      >
        {" "}
        total applicants :{cardsCount}
      </span>
      <div style={{
        display : "flex",
        columnGap : "23px"
      }}>
        {cards.map((item, index) => (
          <Card
            key={index}
            title={item.applicantName}
            loanAmount={item.applicantLoan}
            onClick={() => navigate(`/dashboard/application/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
