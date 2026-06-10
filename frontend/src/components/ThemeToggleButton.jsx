import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={styles.button} title="Toggle Theme">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

const styles = {
  button: {
    position: "fixed",
    top: "16px",
    right: "16px",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    cursor: "pointer",
    fontSize: "18px",
    zIndex: 9999,
  },
};
