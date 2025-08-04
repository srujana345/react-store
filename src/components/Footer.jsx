import React from "react";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#2c2c2c",
    color: "#f1f1f1",
    textAlign: "center",
    padding: "1rem",
    fontSize: "0.95rem",
    // position: "fixed",
    // bottom: 0,
    width: "100%",
    
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    letterSpacing: "0.5px",
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 Qaffeine. All rights reserved.</p>
    </footer>
  );
}
