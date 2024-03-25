import "../components/css/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Logout from "./Logout";
import AddVegetable from "./AddVegetable";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/css/Admin.css";

export default function Admin() {
  const [vegetables, setVegetables] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState({});
  // weight eka thampath karaganna tmi meka thiyenne
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [userName, setUserName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const vegetableRoute = location.state?.vegetableRoute || {
    name: "",
    price: "",
    image: "",
  };
  const [editedVegetable, setEditedVegetable] = useState(vegetableRoute);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetchVegetables();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.name) {
      setUserName(userInfo.name);
    }
  }, []);

  const fetchVegetables = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api");
      setVegetables(response.data);
    } catch (error) {
      console.error("Error fetching vegetables:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVegetable({
      ...editedVegetable,
      [name]: value,
    });
  };

  const handleUpdateVegetable = async () => {
    try {
      console.log("Attempting to update vegetable:", editedVegetable);

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

  const handleWeightChange = (vegetableId, weight) => {
    setSelectedWeights({
      ...selectedWeights,
      [vegetableId]: weight,
    });
  };

  const handleUpdateFormSubmit = () => {
    fetchVegetables();

    setSelectedVegetable(null);
  };

  const handleDeleteVegetable = async (vegetableId) => {
    try {
      await axios.delete(`http://localhost:8070/api/delete/${vegetableId}`);
      fetchVegetables();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/api/search?query=${searchQuery}`
      );
      setVegetables(response.data);
    } catch (error) {
      console.error("Error searching vegetables:", error);
    }
  };

  const calculatePrice = (vegetableId, pricePer100g) => {
    const selectedWeight = selectedWeights[vegetableId] || 100; // Default to 100g
    return (selectedWeight / 100) * pricePer100g;
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="wellcome">Welcome to</div>
        <div className="homepara">Fresh Vegetable Delivery in Sri Lanka</div>
        <div className="paragraphOne">
          Find the best prices of fresh vegetable in Sri Lanka for online
          delivery. Islandwide delivery
        </div>
        <div className="paragraphTwo">at best price and quality.</div>
        <div className="buttons"></div>

        <input
          type="text"
          placeholder="Search vegetables"
          value={searchQuery}
          className="search-bar"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="searchBtn" onClick={handleSearch}>
          Search
        </button>
        <div>
          <Link className="nav-link orders vieworder" to="/orders">
            View All Orders
          </Link>
        </div>

        {userName && (
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            Welcome, {userName}!
          </div>
        )}
      </div>

      <div>
        <Logout />
      </div>

      <div className="vegetable-container">
        {vegetables.map((vegetable) => (
          <div key={vegetable._id} className="vegetable-item">
            <h3 className="vegeName">{vegetable.name}</h3>
            <p>Price per 100g: {vegetable.price}</p>
            <img
              className="imgVegeHome"
              src={vegetable.image}
              alt={vegetable.name}
              style={{ width: "370px", height: "240px" }}
            />
            <div>
              <label>Weight:</label>
              <select
                value={selectedWeights[vegetable._id] || 100}
                onChange={(e) =>
                  handleWeightChange(vegetable._id, parseInt(e.target.value))
                }
              >
                {Array.from(Array(100), (e, i) => (
                  <option key={i + 1} value={(i + 1) * 100}>
                    {(i + 1) * 100}g
                  </option>
                ))}
              </select>
              <div>
                Total Price: Rs.{" "}
                {calculatePrice(vegetable._id, vegetable.price).toFixed(2)}
              </div>

              <Link
                className="editbtn"
                to={`/update/${vegetable._id}`}
                state={{ vegetable: vegetable }}
              >
                Edit
              </Link>

              <button
                className="crudButton"
                onClick={() => handleDeleteVegetable(vegetable._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <AddVegetable />
      </div>

      {/* <form className="form71">
      <div className="nushan">
       
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
            price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={editedVegetable.price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            image
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
        
        <button type="button" onClick={handleUpdateVegetable} className="btn btn-primary">
          Update
        </button>
      </form> */}
    </div>
  );
}
