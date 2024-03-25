import React, { useState } from "react";
import axios from "axios";
import "../components/css/Signup.css";
import { Link } from "react-router-dom";

export default function SignUser() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [address, setaddress] = useState("");
  const [mobileno, setmobileno] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    address: "",
    mobileno: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstname: "",
      lastname: "",
      address: "",
      mobileno: "",
      email: "",
      password: "",
    };

    if (!firstname.trim()) {
      newErrors.firstname = "First name is required.";
      valid = false;
    }
    if (!lastname.trim()) {
      newErrors.lastname = "Last name is required.";
      valid = false;
    }
    if (!address.trim()) {
      newErrors.address = "Address is required.";
      valid = false;
    }
    if (!mobileno.trim()) {
      newErrors.mobileno = "Mobileno is required.";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.trim().length < 8) {
      newErrors.password = "Password should be at least 8 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newuser = {
        firstname,
        lastname,
        address,
        mobileno,
        email,
        password,
      };
      axios
        .post("http://localhost:8070/api/signup", newuser)
        .then(() => {
          alert("user Added");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  return (
    <div>
      <form className=" mainsign" onSubmit={sendData}>
        <div class="mb-3">
          <label for="FirstName" class="form-label">
            FirstName
          </label>
          <input
            type="text"
            class="form-control"
            id="FirstName"
            name="FirstName"
            pattern="[A-Za-z]+"
            onChange={(e) => {
              setfirstname(e.target.value);
            }}
          />

          <div className="notice" style={{ marginLeft: "20px" }}>
            please don't use any number or simbol
          </div>
          <div
            className="error-message"
            style={{ color: "red", marginLeft: "20px" }}
          >
            {errors.firstname}
          </div>
        </div>

        <div class="mb-3">
          <label for="LastName" class="form-label">
            LastName
          </label>
          <input
            type="text"
            class="form-control"
            id="LastName"
            name="LastName"
            pattern="[A-Za-z]+"
            onChange={(e) => {
              setlastname(e.target.value);
            }}
          />
          <div className="notice" style={{ marginLeft: "20px" }}>
            please don't use any number or simbol
          </div>
          <div
            className="error-message"
            style={{ color: "red", marginLeft: "20px" }}
          >
            {errors.lastname}
          </div>
        </div>

        <div class="mb-3">
          <label for="Address" class="form-label">
            Addres
          </label>
          <input
            type="text"
            class="form-control"
            id="Address"
            name="Address"
            onChange={(e) => {
              setaddress(e.target.value);
            }}
          />
          <div
            className="error-message"
            style={{ color: "red", marginLeft: "20px" }}
          >
            {errors.address}
          </div>
        </div>

        <div class="mb-3">
          <label for="mobileno" class="form-label">
            Mobile No:
          </label>
          <input
            type="number"
            class="form-control"
            id="mobileno"
            name="mobileno"
            onChange={(e) => {
              setmobileno(e.target.value);
            }}
          />
          <div
            className="error-message"
            style={{ color: "red", marginLeft: "20px" }}
          >
            {errors.mobileno}
          </div>
        </div>

        <div class="mb-3">
          <label for="Email" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="Email"
            name="Email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <div
            className="error-message"
            style={{ color: "red", marginLeft: "20px" }}
          >
            {errors.email}
          </div>
        </div>

        <div class="mb-3">
          <label for="Password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="Password"
            name="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <div
            className="error-message"
            style={{ color: "red", marginLeft: "20px" }}
          >
            {errors.password}
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Signup
        </button>

        <div style={{ marginLeft: "20px" }}>
          If you already signup?
          <span>
            <Link className="upin" to="/signin">
              {" "}
              Signin
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
