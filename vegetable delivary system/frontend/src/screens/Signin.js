import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../components/css/Signin.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8070/api/signin",
        {
          email,
          password,
        },
        config
      );

      console.log("Response received:", data);

      if (data.status === "SUCCESS") {
        console.log("User signed in successfully");

        localStorage.setItem("userInfo", JSON.stringify(data));

        if (data.data.isAdmin === true) {
          console.log("Redirecting to admin page");
          navigate("/admin");
        } else {
          console.log("Redirecting to user page");
          navigate("/customer");
        }
      } else {
        const errorMessage = data.message || "Sign-in failed";
        console.error("Sign-in failed:", errorMessage);

        alert(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <form className="mainlog" onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Signin
        </button>

        <div style={{ marginLeft: "20px" }}></div>
        <div style={{ marginLeft: "20px" }}>
          Don't have an account?{" "}
          <span>
            <Link className="upin" to="/signup">
              Signup
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
