import React, { useEffect } from "react";
import { appContext } from "../App";
import { useContext } from "react";
import "./Orders.css";
import axios from "axios";
export default function Orders() {
  const API = process.env.REACT_APP_API;
  const { orders, setOrders,user } = useContext(appContext);
  const fetchOrders = async () => {
    const url = `${API}/api/order/showorder/${user.email}`;
    const result = await axios.get(url);
    setOrders(result.data);
  };

 useEffect(() => {
  fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


 return (
  <div className="orders-container" style={{ background: "linear-gradient(45deg,#6F4e37, #E1B995 100%)" }}>
    <h3>My Orders</h3>
    <ol className="order-list">
      {orders.map((value, index) => (
        <li key={index} className="order-item">
          <span><strong>Date:</strong> {new Date(value.createdAt).toLocaleDateString()}</span>
          <span><strong>Email:</strong> {value.email}</span>
          <span><strong>Total Items:</strong> {Object.keys(value.items).length}</span>
          <span><strong>Amount Paid:</strong> ₹{value.total}</span>
        </li>
      ))}
    </ol>
    <hr />
  </div>
);

}
