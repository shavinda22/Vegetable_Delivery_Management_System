import React, { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/css/Updatepage.css"

const Updatepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vegetable = location.state?.vegetable || {
    name: "",
    price: "",
    image: "",
  };

  const [editedVegetable, setEditedVegetable] = useState(vegetable);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVegetable({
      ...editedVegetable,
      [name]: value,
    });
  };

  const handleUpdateVegetable = async () => {
    try {
      await axios.put(
        `http://localhost:8070/api/update/${editedVegetable._id}`,
        editedVegetable
      );
      console.log("Vegetable updated successfully.");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating vegetable:", error);
    }
  };

  return (
    <div>
      <form className="updateform min-vh-100">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedVegetable.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedVegetable.price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={editedVegetable.image}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button
          type="button"
          onClick={handleUpdateVegetable}
          className="btn btn-primary"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Updatepage;
