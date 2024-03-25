import "../components/css/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Logout from "./Logout";

export default function Customer() {
  const [vegetables, setVegetables] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState({});
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [userName, setUserName] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);

  useEffect(() => {
    fetchVegetables();
    if (userInfo && userInfo.firstname) {
      setUserName(userInfo.firstname);
    }
  }, [userInfo]);

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
        <div className="buttons">
          <p className="username">{userInfo.firstname}</p>
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
              <button
                className="crudButton"
                onClick={() => addToCart(vegetable)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Cart cartItems={cart} setCart={setCart} />
    </div>
  );
}
