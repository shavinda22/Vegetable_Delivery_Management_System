import "../components/css/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";


export default function Home() {
  const [vegetables, setVegetables] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState({});
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [userName, setUserName] = useState("");

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

  const handleWeightChange = (vegetableId, weight) => {
    setSelectedWeights({
      ...selectedWeights,
      [vegetableId]: weight,
    });
  };

  const addToCart = (vegetable) => {
    const selectedWeight = selectedWeights[vegetable._id] || 100;
    const newItem = {
      ...vegetable,
      quantity: selectedWeight,
      totalPrice: (selectedWeight / 100) * vegetable.price,
    };
    setCart([...cart, newItem]);
  };

  const handleUpdate = (vegetable) => {
    setSelectedVegetable(vegetable);
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
    const selectedWeight = selectedWeights[vegetableId] || 100;
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
        <div className="buttons">
          <Link className="button  nav-link " to="/signup">
            Sign Up
          </Link>
          <Link className="nav-link button" to="/signin">
            Sign In
          </Link>
        </div>

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

        {userName && (
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            Welcome, {userName}!
          </div>
        )}
      </div>
      <div></div>

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
            </div>
          </div>
        ))}
      </div>

      {selectedVegetable && (
        <div>
          <h2>Update Vegetable</h2>
          <input
            type="text"
            placeholder="Updated Name"
            value={selectedVegetable.name}
          />
          <button onClick={handleUpdateFormSubmit}>Update</button>
        </div>
      )}
    </div>
  );
}
