import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8070/api/logout");

      if (response.data.status === "SUCCESS") {
        localStorage.removeItem("userInfo");
        navigate("/signin");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <button className="logoutBtn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
