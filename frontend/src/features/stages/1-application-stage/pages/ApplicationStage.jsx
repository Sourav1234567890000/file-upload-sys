import React, { useEffect, useState } from "react";
import ApplicantsForm from "../../../applicant/components/ApplicantsForm";
import CoApplicantForm from "../../../co-applicant/components/CoApplicantForm";
import { useNavigate, useParams } from "react-router-dom";
import ApplicantDetails from "../components/ApplicantDetails";

const ApplicationStage = () => {
  const navigate = useNavigate();

  const [formStatus, setFormStatus] = useState(false);
  const [coAppFormStatus, setCoAppFormStatus] = useState(false);
  const [applicantId, setApplicantId] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantLoan, setApplicantLoan] = useState(null);
  const [fetchApplicantDetails, setFetchApplicantDetails] = useState({});

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

  useEffect(() => {
    if (urlApplicantId) {
      const fetchDetails = async () => {
        const response = await fetch(
          `http://localhost:5000/api/loan/applicant/${urlApplicantId}`,
          {
            method: "GET",
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
  return (
    <div>
      <h1>Applications Stage</h1>
      {urlApplicantId ? (
        <ApplicantDetails fetchApplicantDetails={fetchApplicantDetails} />
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
      <span>{coApplicants.length}</span>
    </div>
  );
};

export default ApplicationStage;
