import React, { useEffect, useState } from "react";

const CoApplicantDetails = ({ urlApplicantId }) => {
  const [fetchCoApplicantDetails, setFetchCoApplicantDetails] = useState([]);
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
    <div>
      {fetchCoApplicantDetails.map((coApplicant, index) => {
        const fields = [
          { label: "First Name", value: coApplicant.firstName },
          { label: "Middle Name", value: coApplicant.middleName },
          { label: "Last Name", value: coApplicant.lastName },
          { label: "Aadhaar Number", value: coApplicant.aadhaarNumber },
          { label: "Email", value: coApplicant.email },
          { label: "Relation", value: coApplicant.relation },
        ];
        return (
          <div key={index} style={styles.container}>
            <h2>Co-Applicant Details</h2>
            {fields.map((field, i) => (
              <div key={i} style={styles.row}>
                <span style={styles.label}>{field.label}</span>
                <span style={styles.value}>{field.value}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
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

export default CoApplicantDetails;
