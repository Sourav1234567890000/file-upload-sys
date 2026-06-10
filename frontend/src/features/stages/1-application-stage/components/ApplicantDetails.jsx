import React, { useEffect, useState } from "react";
import styles from "./applicantDetails.module.css";

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
          }
        );

        const data = await response.json();
        setFetchApplicantDetails(data.applicant);
      };

      fetchDetails();
    }
  }, [urlApplicantId, token]);

  const fields = [
    { label: "First Name", value: fetchApplicantDetails.firstName },
    { label: "Middle Name", value: fetchApplicantDetails.middleName },
    { label: "Last Name", value: fetchApplicantDetails.lastName },
    { label: "PAN Number", value: fetchApplicantDetails.panNumber },
    { label: "Aadhaar Number", value: fetchApplicantDetails.aadhaarNumber },
    { label: "Email", value: fetchApplicantDetails.email },
  ];

 return (
  <div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.heading}>Applicant Details</h2>
      <span className={styles.badge}>
        {fetchApplicantDetails.firstName} {fetchApplicantDetails.lastName}
      </span>
    </div>

    <div className={styles.grid}>
      {fields.map((field, index) => (
        <div key={index} className={styles.fieldCard}>
          <label className={styles.label}>{field.label}</label>
          <div className={styles.value}>{field.value || "-"}</div>
        </div>
      ))}
    </div>
  </div>
);
};

export default ApplicantDetails;