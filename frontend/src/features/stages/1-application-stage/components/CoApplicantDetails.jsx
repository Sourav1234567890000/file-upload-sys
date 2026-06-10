import React, { useEffect, useState } from "react";
import styles from "./applicantDetails.module.css";

const CoApplicantDetails = ({ urlApplicantId }) => {
  const [fetchCoApplicantDetails, setFetchCoApplicantDetails] = useState([]);
  const [fetchCoApplicantCount, setFetchCoApplicantCount] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!urlApplicantId) return;

        const response = await fetch(
          `http://localhost:5000/api/loan/co-applicant/${urlApplicantId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setFetchCoApplicantCount(data.coApplicantCount);
        setFetchCoApplicantDetails(data.coApplicant || []);
      } catch (error) {
        console.error("Error fetching co-applicant:", error);
      }
    };

    fetchDetails();
  }, [urlApplicantId, token]);

  return (
    <>
      {fetchCoApplicantCount > 0 && (
        <h2 className={styles.heading}>
          Co-Applicants ({fetchCoApplicantCount})
        </h2>
      )}

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
          <div
            key={coApplicant._id || index}
            className={styles.container}
            style={{ marginBottom: "20px" }}
          >
            <h3 className={styles.heading}>
              Co-Applicant {index + 1}
            </h3>

            {fields.map((field, i) => (
              <div key={i} className={styles.row}>
                <span className={styles.label}>{field.label}</span>
                <span className={styles.value}>
                  {field.value || "-"}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default CoApplicantDetails;