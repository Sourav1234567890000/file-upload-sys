import React, { useEffect, useState } from "react";
import ApplicantsForm from "../../../applicant/components/ApplicantsForm";
import CoApplicantForm from "../../../co-applicant/components/CoApplicantForm";
import { useNavigate, useParams } from "react-router-dom";
import ApplicantDetails from "../components/ApplicantDetails";
import CoApplicantDetails from "../components/CoApplicantDetails";

const ApplicationStage = () => {
  const navigate = useNavigate();

  const [formStatus, setFormStatus] = useState(false);
  const [coAppFormStatus, setCoAppFormStatus] = useState(false);
  const [applicantId, setApplicantId] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantLoan, setApplicantLoan] = useState(null);

  // getting applicantId from useParams
  const { applicantId: urlApplicantId } = useParams();

  // array for multiple co-applicants
  const [coApplicants, setCoApplicants] = useState([1]);

  const addCoapplicant = () => {
    setCoApplicants((prev) => [...prev, prev.length + 1]);
  };

  const submitAppDetails = () => {
    const applicantName = localStorage.getItem("applicantName");
    const applicantLoan = localStorage.getItem("loanAmount");
    navigate("/dashboard", { state: { applicantName, applicantLoan } });
  };

  return (
    <div>
      <h1>Applications Stage</h1>
      {urlApplicantId ? (
        <>
          <ApplicantDetails urlApplicantId={urlApplicantId} />
          <br></br>
          <CoApplicantDetails urlApplicantId={urlApplicantId} />
        </>
      ) : (
        <ApplicantsForm
          setFormStatus={setFormStatus}
          setApplicantId={setApplicantId}
        />
      )}

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
    </div>
  );
};

export default ApplicationStage;
