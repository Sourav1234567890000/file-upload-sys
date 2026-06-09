import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Card from "../components/Card";
import styles from "./dashboard.module.css";

const DashboardHome = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const decoded = token ? jwtDecode(token) : null;

  const email = user?.userInfo?.email;
  const userName = user?.userInfo?.user;

  const [cards, setCards] = useState([]);
  const [cardsCount, setCardsCount] = useState(0);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const countResponse = await fetch(
          "http://localhost:5000/api/loan/dashboard/totalApplicants-count",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const countData = await countResponse.json();
        setCardsCount(countData.totalApplicantCount || 0);

        if (decoded?.role === "superAdmin") {
          setPermission(true);
        }

        const applicantResponse = await fetch(
          "http://localhost:5000/api/loan/dashboard/applicantDetails",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const applicantData = await applicantResponse.json();

        setCards(
          (applicantData.applicantDetails || []).map((item) => ({
            applicantName: item.firstName,
            applicantLoan: item.loanAmount,
            id: item._id,
            userName: item.createdBy?.userName || item.createdBy?.firstName || "System",
            role: item.createdBy?.role || "user"
          })),
        );
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    if (token) fetchDashboardData();
  }, [token]);

  return (
    <div className={styles.dashboard}>
      {/* 1. TOP MAIN HEADER NAVBAR ROW */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Loan Against property</h1>
        </div>

        <div className={styles.rightControlGroup}>
          <div className={styles.actions}>
            {permission && (
              <button className={styles.secondaryButton} onClick={() => navigate("/dashboard/create-user")}>
                Provision User
              </button>
            )}
            <button className={styles.primaryButton} onClick={() => navigate("/dashboard/new-application")}>
              + Create New Application
            </button>
          </div>

          <div className={styles.userInfo}>
            <div className={styles.profileMetaText}>
              <h2 className={styles.welcome}>{userName}</h2>
              <p className={styles.email}>{email}</p>
            </div>
            <div className={styles.userBadgeAvatar}>
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
        </div>
      </div>

      {/* 2. LOWER REGION: Now stacks vertically */}
      <div className={styles.appBodyWindow}>
        
        {/* Horizontal Navigation Sub-Bar Ribbon */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarBrand}>FINANCE PORTAL</div>
          <div className={styles.navigationList}>
            <div className={styles.navItemActive}>💼 Underwriting Cases</div>
          </div>
        </div>

        {/* Workspace Display view */}
        <div className={styles.mainWorkspace}>
          <div className={styles.contentArea}>
            
            <div className={styles.statsCard}>
              <span>Total Operational Applicants</span>
              <h2>{cardsCount}</h2>
            </div>

            <div className={styles.sectionHeaderStrip}>
              <span className={styles.sectionTitle}>Active Underwriting Files</span>
            </div>

            <div className={styles.cardGrid}>
              {cards.map((item) => (
                <Card
                  key={item.id}
                  title={item.applicantName}
                  loanAmount={item.applicantLoan}
                  userName={item.userName}
                  role={item.role}
                  onClick={() => navigate(`/dashboard/application/${item.id}`)}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;