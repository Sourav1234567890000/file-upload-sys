import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [submitStatus, setSubmitStatus] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result) {
      console.log(result);
      setSubmitStatus(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="userName">user name</label>
        <input
          type="text"
          name="userName"
          onChange={handleChange}
          value={formData.name}
        ></input>
        <br></br>

        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.name}
        ></input>
        <br></br>

        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.name}
        ></input>
        <br></br>

        <label htmlFor="role">role</label>
        <select name="role" onChange={handleChange} value={formData.name}>
          <option>Select role</option>
          <option value="rm">rm</option>
          <option value="admin">admin</option>
        </select>

        <button type="submit">submit</button>
      </form>
      {submitStatus && <span>form submitted successfully</span>}
    </div>
  );
};

export default CreateUser;
