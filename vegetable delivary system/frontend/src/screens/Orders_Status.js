import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/css/Order_Status.css";

export default function OrdersStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/details");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="status">
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>Receiver Name: {order.customerDetails.name}</p>
            <p>Receiver Address: {order.customerDetails.address}</p>
            <p>Receiver Mobile Number: {order.customerDetails.mobileNumber}</p>
            <p>Sender Email: {order.customerDetails.email}</p>

            <h4>Items</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.vegetableId}>
                  {item.name} - {item.weight}g - Rs.{" "}
                  {item.totalPrice.toFixed(2)}
                </li>
              ))}
              <hr size="7"></hr>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
