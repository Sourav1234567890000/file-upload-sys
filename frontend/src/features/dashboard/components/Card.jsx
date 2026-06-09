import styles from "./card.module.css";

const Card = ({ title, loanAmount, userName, role, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.viewDetails}>View Details →</div>
      </div>

      <div className={styles.loanSection}>
        <span className={styles.loanLabel}>Loan Amount</span>
        <span className={styles.loanAmount}>
          ₹{Number(loanAmount).toLocaleString("en-IN")}
        </span>
      </div>

      <div className={styles.divider}></div>

      {/* Structured and cleanly formatted user metadata footer */}
      <div className={styles.userInfo}>
        <div className={styles.userMeta}>
          <span className={styles.metaLabel}>Created By</span>
          <span className={styles.userName}>{userName || "N/A"}</span>
        </div>
        <span className={`${styles.roleBadge} ${styles[role] || ""}`}>
          {role === "rm" ? "RM" : role === "superAdmin" ? "Super Admin" : "Admin"}
        </span>
      </div>
    </div>
  );
};

export default Card;