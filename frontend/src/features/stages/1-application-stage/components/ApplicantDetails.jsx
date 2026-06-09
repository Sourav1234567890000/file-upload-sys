import React, { useEffect, useState } from "react";
import CoApplicantDetails from "./CoApplicantDetails";

const ApplicantDetails = ({ urlApplicantId }) => {
  const [fetchApplicantDetails, setFetchApplicantDetails] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    if (urlApplicantId) {
      const fetchDetails = async () => {
        const response = await fetch(
          `http://localhost:5000/api/loan/applicant/${urlApplicantId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        const applicant = data.applicant;
        setFetchApplicantDetails(applicant);
        console.log(applicant);
      };
      fetchDetails();
    }
  }, []);

  const fields = [
    { label: "First Name", value: fetchApplicantDetails.firstName },
    { label: "Middle Name", value: fetchApplicantDetails.middleName },
    { label: "Last Name", value: fetchApplicantDetails.lastName },
    { label: "Pan Number", value: fetchApplicantDetails.panNumber },
    { label: "Aadhar Number", value: fetchApplicantDetails.aadhaarNumber },
    { label: "Email", value: fetchApplicantDetails.email },
  ];

  const [fetchCoApplicantDetails, setFetchCoApplicantDetails] = useState([]);
  const [fetchCoApplicantCount, setFetchCoApplicantCount] = useState(null);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log("before CoApplicant token:", token);
        console.log("CoApplicant ID:", urlApplicantId);

        if (!urlApplicantId) return;

        const response = await fetch(
          `http://localhost:5000/api/loan/co-applicant/${urlApplicantId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        console.log("API Response:", data);

        const coApplicant = data.coApplicant;
        const coApplicantCount = data.coApplicantCount;

        setFetchCoApplicantCount(coApplicantCount);
        setFetchCoApplicantDetails(coApplicant);
      } catch (error) {
        console.error("Error fetching co-applicant:", error);
      }
    };

    fetchDetails();
  }, [urlApplicantId, token]);

  return (
    <>
      <div style={styles.container}>
        <h2>Applicant details : {fetchApplicantDetails.firstName}</h2>
        {fields.map((field, index) => (
          <div key={index} style={styles.row}>
            <span style={styles.label}>{field.label}</span>
            <span style={styles.value}>{field.value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

const styles = {
  container: {
    width: "60%",
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f1f1f1",
  },

  label: {
    fontWeight: "600",
    color: "#374151",
    width: "40%",
  },

  value: {
    color: "#111827",
    width: "60%",
    textAlign: "right",
  },
};

export default ApplicantDetails;
