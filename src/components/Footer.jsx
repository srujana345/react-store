import React from "react";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#2c2c2c",
    color: "#f1f1f1",
    textAlign: "center",
    padding: "1rem 0",
    fontSize: "0.95rem",
    position: "relative",
    bottom: 0,
    width: "100%",
   
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    letterSpacing: "0.5px",
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 YourStore. All rights reserved.</p>
    </footer>
  );
}
