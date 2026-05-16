import React, { useState } from "react";
import ApplicantsForm from "../../applicant/components/ApplicantsForm";
import CoApplicantForm from "../../co-applicant/components/CoApplicantForm";
import { useNavigate } from "react-router-dom";

const ApplicationStage = () => {
  const navigate = useNavigate();

  const [formStatus, setFormStatus] = useState(false);
  const [coAppFormStatus, setCoAppFormStatus] = useState(false);
  const [applicantId, setApplicantId] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantLoan, setApplicantLoan] = useState(null);

  // array for multiple co-applicants
  const [coApplicants, setCoApplicants] = useState([1]);

  const addCoapplicant = () => {
    setCoApplicants((prev) => [...prev, prev.length + 1]);
  };

  const submitAppDetails = () => {
    const applicantName = localStorage.getItem("applicantName");
    const applicantLoan = localStorage.getItem("loanAmount");
    navigate("/dashboard", { state : {applicantName , applicantLoan}});
  };

  return (
    <div>
      <h1>Applications Stage</h1>
      <ApplicantsForm
        setFormStatus={setFormStatus}
        setApplicantId={setApplicantId}
      />

      {formStatus &&
        coApplicants.map((item, index) => (
          <CoApplicantForm
            key={index}
            applicantId={applicantId}
            setCoAppFormStatus={setCoAppFormStatus}
          />
        ))}

      {coAppFormStatus && (
        <button onClick={addCoapplicant}>Add More Co-Applicant</button>
      )}

      <button onClick={submitAppDetails}>Submit Application Details</button>
      <span>{coApplicants.length}</span>
    </div>
  );
};

export default ApplicationStage;
