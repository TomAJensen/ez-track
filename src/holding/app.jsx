import { useState } from "react";

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "'Georgia', serif",
    background: "#f5f0eb",
    gap: "2rem",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#1a1a1a",
    letterSpacing: "-0.02em",
    margin: 0,
  },
  button: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    background: "#1a1a1a",
    color: "#f5f0eb",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

function Page({ number, onNavigate }) {
  const other = number === 1 ? 2 : 1;
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Page {number === 1 ? "one" : "two"}</h1>
      <button style={styles.button} onClick={onNavigate}>
        Page {other}
      </button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  return (
    <Page
      number={page}
      onNavigate={() => setPage(page === 1 ? 2 : 1)}
    />
  );
}
