import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CoApplicantForm = () => {
  const { applicantId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    aadhaarCard: "",
    aadhaarNumber: "",
    relation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, aadhaarCard: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (let key in formData) {
      if (key === "aadhaarCard") {
        payload.append(key, formData[key]); // file
      } else {
        payload.append(key, formData[key]); // text
      }
    }

    payload.append("applicantId", applicantId);

    const response = await fetch(
      "http://localhost:5000/api/loan/aply/co-applicant",
      {
        method: "POST",
        body: payload,
      },
    );

    const result = await response.json();
    console.log(result);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>firstName</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>middleName</label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />

        <label>lastName</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>aadhaarCard</label>
        <input type="file" name="aadhaarCard" onChange={handleFileChange} />

        <label>aadhaarNumber</label>
        <input
          type="text"
          name="aadhaarNumber"
          value={formData.aadhaarNumber}
          onChange={handleChange}
        />

        <label>relation</label>
        <select
          name="relation"
          value={formData.relation}
          onChange={handleChange}
        >
          <option value="">Select Relation</option>
          <option value="spouse">spouse</option>
          <option value="father">father</option>
          <option value="mother">mother</option>
          <option value="brother">brother</option>
          <option value="sister">sister</option>
          <option value="son">son</option>
          <option value="daughter">daughter</option>
          <option value="friend">friend</option>
          <option value="business_partner">business_partner</option>
          <option value="other">other</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CoApplicantForm;
