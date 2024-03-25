import React, { useState } from "react";
import axios from "axios";
import "../components/css/AddVegetable.css";

export default function AddVegetable() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8070/api/add", formData)
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage("Vegetable added successfully.");
          setErrorMessage("");
        } else {
          setSuccessMessage("");
          setErrorMessage("Please try again.");
        }
      })
      .catch((error) => {
        setSuccessMessage("");
        setErrorMessage("Error adding vegetable. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="addvegetable">
      <h2>Add a New Vegetable (Only for Admin)</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label className="firstform">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />

          <label className="mx-5">Price per 100g:</label>
          <input
            type="number"
            name="price"
            value={formData.price_per_100g}
            onChange={onChange}
            required
          />

          <label className="mx-5">Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.img}
            onChange={onChange}
            required
          />
        </div>
        <button className="addvegebutton my-3" type="submit">
          Add Vegetable
        </button>
      </form>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}
