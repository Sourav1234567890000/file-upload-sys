import React from "react";

const ApplicantDetails = ({ fetchApplicantDetails }) => {
  const fields = [
    { label: "First Name", value: fetchApplicantDetails.firstName },
    { label: "Middle Name", value: fetchApplicantDetails.middleName },
    { label: "Last Name", value: fetchApplicantDetails.lastName },
    { label: "Pan Number", value: fetchApplicantDetails.panNumber },
    { label: "Aadhar Number", value: fetchApplicantDetails.aadhaarNumber },
    { label: "Email", value: fetchApplicantDetails.email },
  ];

  return (
    <div style={styles.container}>
      {fields.map((field, index) => (
        <div key={index} style={styles.row}>
          <span style={styles.label}>{field.label}</span>
          <span style={styles.value}>{field.value}</span>
        </div>
      ))}
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

export default ApplicantDetails;
