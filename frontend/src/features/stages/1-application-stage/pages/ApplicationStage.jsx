import React, { useState } from "react";
import ApplicantsForm from "../../../applicant/components/ApplicantsForm";
import CoApplicantForm from "../../../co-applicant/components/CoApplicantForm";
import { useNavigate, useParams } from "react-router-dom";
import ApplicantDetails from "../components/ApplicantDetails";
import CoApplicantDetails from "../components/CoApplicantDetails";
import styles from "./applicationStage.module.css";

const ApplicationStage = () => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState(false);
  const [coAppFormStatus, setCoAppFormStatus] = useState(false);
  const [applicantId, setApplicantId] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantLoan, setApplicantLoan] = useState(null);
  const { applicantId: urlApplicantId } = useParams();
  const [coApplicants, setCoApplicants] = useState([1]);

  const addCoapplicant = () => {
    setCoApplicants((prev) => [...prev, prev.length + 1]);
  };

  const submitAppDetails = () => {
    const applicantName = localStorage.getItem("applicantName");
    const applicantLoan = localStorage.getItem("loanAmount");
    navigate("/dashboard", {
      state: { applicantName, applicantLoan },
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Application Stage</h1>

        {urlApplicantId ? (
          <>
            <div className={styles.sectionHeader}>Applicant Details</div>
            <div className={styles.section}>
              <ApplicantDetails urlApplicantId={urlApplicantId} />
            </div>

            <div className={styles.sectionHeader}>Co-Applicant Details</div>
            <div className={styles.section}>
              <CoApplicantDetails urlApplicantId={urlApplicantId} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.sectionHeader}>Applicant Details</div>
            <div className={styles.section}>
              <ApplicantsForm
                setFormStatus={setFormStatus}
                setApplicantId={setApplicantId}
              />
            </div>
          </>
        )}

        {formStatus &&
          coApplicants.map((item, index) => (
            <React.Fragment key={index}>
              <div className={styles.sectionHeader}>
                Co-Applicant Form {coApplicants.length > 1 ? `#${index + 1}` : ""}
              </div>
              <div className={styles.section}>
                <CoApplicantForm
                  applicantId={applicantId}
                  setCoAppFormStatus={setCoAppFormStatus}
                />
              </div>
            </React.Fragment>
          ))}
      </div>

      {/* Button container placed neatly right underneath the white card */}
      <div className={styles.buttonContainer}>
        {coAppFormStatus && (
          <button className={styles.secondaryButton} onClick={addCoapplicant}>
            Add More Co-Applicant
          </button>
        )}
        <button className={styles.primaryButton} onClick={submitAppDetails}>
          Submit Application Details
        </button>
      </div>
    </div>
  );
};

export default ApplicationStage;