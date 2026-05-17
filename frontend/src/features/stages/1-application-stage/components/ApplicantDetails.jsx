import React, { useEffect, useState } from "react";
import CoApplicantDetails from "./CoApplicantDetails";

const ApplicantDetails = ({ fetchApplicantDetails, urlApplicantId }) => {
  const fields = [
    { label: "First Name", value: fetchApplicantDetails.firstName },
    { label: "Middle Name", value: fetchApplicantDetails.middleName },
    { label: "Last Name", value: fetchApplicantDetails.lastName },
    { label: "Pan Number", value: fetchApplicantDetails.panNumber },
    { label: "Aadhar Number", value: fetchApplicantDetails.aadhaarNumber },
    { label: "Email", value: fetchApplicantDetails.email },
  ];

  const [fetchCoApplicantDetails, setFetchCoApplicantDetails] = useState({});
  const [fetchCoApplicantCount, setFetchCoApplicantCount] = useState(null);
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `http://localhost:5000/api/loan/co-applicant/${urlApplicantId}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      const coApplicant = data.coApplicant;
      const coApplicantCount = data.coApplicantCount;
      setFetchCoApplicantCount(coApplicantCount);
      setFetchCoApplicantDetails(coApplicant);
      console.log(coApplicant);
    };
    fetchDetails();
  }, []);

  return (
    <>
      <div style={styles.container}>
        {fields.map((field, index) => (
          <div key={index} style={styles.row}>
            <span style={styles.label}>{field.label}</span>
            <span style={styles.value}>{field.value}</span>
          </div>
        ))}
      </div>
      <span> Co-Applicant = {fetchCoApplicantCount}</span>
      {fetchCoApplicantCount && (
        <CoApplicantDetails fetchCoApplicantDetails={fetchCoApplicantDetails} />
      )}
      <br></br>
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
