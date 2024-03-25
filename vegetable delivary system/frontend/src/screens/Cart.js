import React, { useState } from "react";
import axios from "axios";
import "../components/css/Cart.css";

function Cart({ cartItems, setCart }) {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    mobileNumber: "",
    email: "",
  });

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);

    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      customerDetails,
      cartItems: cartItems.map((item) => ({
        vegetableId: item._id,
        name: item.name,
        price: item.price,
        weight: item.quantity,
        totalPrice: item.totalPrice,
      })),
    };

    axios
      .post("http://localhost:8070/api/place-order", orderData)
      .then((response) => {
        if (response.status === 200) {
          alert(
            "Order placed successfully. You can pay after receiving your products!"
          );
          setCart([]);
        } else {
          alert("Failed to place the order. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert(
          "An error occurred while placing the order. Please fill your detail & try again."
        );
      });

    setCart([]);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cartbar">
        <h2>Cart</h2>
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cartBar2">
      <h2>Cart</h2>
      <div>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.name} - {item.quantity}g - Rs. {item.totalPrice.toFixed(2)}
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>
          <p>Total Price: Rs. {calculateTotalPrice().toFixed(2)}</p>
          <div>
            <input
              type="text"
              placeholder="Reciver Name"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Reciver Address"
              value={customerDetails.address}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  address: e.target.value,
                })
              }
              className="mx-5"
            />

            <input
              type="number"
              placeholder="Reciver Mobile Number"
              value={customerDetails.mobileNumber}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  mobileNumber: e.target.value,
                })
              }
            />

            
          </div>
          <button className="my-2 placeorderbutton" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
