import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appContext } from "../App";
import axios from "axios";
import "../components/Products.css";

export default function CategoryItems() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useContext(appContext);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/product/category/${category}`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load items. Please try again later.");
        setLoading(false);
      });
  }, [category, API]);

  const handleAdd = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemove = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id] -= 1;
      else delete updated[id];
      return updated;
    });
  };

  return (
    <>
      <div className="product-grid">
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>
        ) : error ? (
          <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>{error}</p>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="product-card">
              <img src={item.image || item.url} alt={item.name} className="product-image" />
              <h2>{item.name}</h2>
              <p>{item.desc}</p>
              <p>₹{item.price}</p>
              <div className="cart-buttons">
                {cart[item._id] ? (
                  <>
                    <button onClick={() => handleRemove(item._id)}>-</button>
                    <span className="cart-qty">{cart[item._id]}</span>
                    <button onClick={() => handleAdd(item._id)}>+</button>
                  </>
                ) : (
                  <button className="add-to-cart-btn" onClick={() => handleAdd(item._id)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No items found in {category} category.
          </p>
        )}
      </div>

      <div className="go-to-cart-fixed">
        <button className="go-to-cart-btn" onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      </div>
    </>
  );
}
