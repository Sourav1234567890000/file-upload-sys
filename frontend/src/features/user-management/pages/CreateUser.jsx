import React, { useState } from "react";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form action="">
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
    </div>
  );
};

export default CreateUser;
