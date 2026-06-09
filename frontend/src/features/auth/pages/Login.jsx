import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setResponse(data);
      
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Invalid email or password combination.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("System connectivity error. Please verify server status.");
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Institutional Branding Hero Segment */}
      <div className={styles.brandPanel}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon} />
          <span className={styles.portalBrandName}>FINANCE PORTAL</span>
        </div>
        
        <div className={styles.brandHeroText}>
          <h2>Secure Commercial Loan Origination System</h2>
          <p>
            Access underwriting files, monitor loan pipeline matrices, and manage relationship account actions from a centralized secure console.
          </p>
        </div>

        <div className={styles.panelFooter}>
          © 2026 Institutional Financial Services Inc. All rights reserved.
        </div>
      </div>

      {/* Structured Authentication Column */}
      <div className={styles.formColumn}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Account Sign In</h1>
          <p className={styles.subtitle}>Welcome back. Please authenticate your identity.</p>

          {errorMessage && (
            <div className={styles.errorBanner}>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Corporate Email</label>
              <input
                type="email"
                name="email"
                placeholder="name@institution.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Authenticate Session
            </button>
          </form>

          {response && (
            <pre className={styles.debugResponse}>
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;