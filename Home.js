import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", background: "black", color: "gold", minHeight: "100vh", padding: 20 }}>
      <h1 style={{ fontSize: 40, marginBottom: 20 }}>Al Shurafa Restaurant</h1>
      <div style={{ position: "relative", marginBottom: 20 }}>
        <img src="/banner.jpg" alt="Banner" style={{ width: "100%", borderRadius: 12 }} />
        <button
          onClick={() => navigate("/order")}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "gold",
            color: "black",
            padding: "16px 28px",
            fontSize: 20,
            border: "none",
            borderRadius: 10,
            fontWeight: "bold",
          }}
        >
          👉 Order Now
        </button>
      </div>
    </div>
  );
}

export default Home;
