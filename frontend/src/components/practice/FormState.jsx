import React, { useState } from "react";

const FormState = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logsOutput = () => {
    console.log(formData);
    setFormData({
      name: "",
      email: "",
    });
  };

  return (
    <div>
      <input
        type="text"
        value={formData.name}
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={formData.email}
        name="email"
        onChange={handleChange}
      />
      <button onClick={logsOutput}>LOGS</button>
    </div>
  );
};

export default FormState;
