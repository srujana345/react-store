import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { appContext } from "../App"; // get global cart
import "../components/Products.css";
import { useNavigate } from "react-router-dom";

export default function HotItems() {
  const [items, setItems] = useState([]);
  const { cart, setCart, products, setProducts } = useContext(appContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://node-backend-eight-henna.vercel.app/api/hot")
      .then((res) => {
        setItems(res.data);
        setProducts((prev) => [...prev, ...res.data]); // merge into global products
      })
      .catch((err) => console.log(err));
  }, []);

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
    <div className="App-Products-Row">
      {items.map((item) => (
        <div key={item._id} className="App-Products-Box">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
          <h4>₹{item.price}</h4>

          <div className="cart-buttons">
            {cart[item._id] ? (
              <>
                <button onClick={() => handleRemove(item._id)}>-</button>
                <span className="cart-qty">{cart[item._id]}</span>
                <button onClick={() => handleAdd(item._id)}>+</button>
              </>
            ) : (
              <button onClick={() => handleAdd(item._id)}>Add to Cart</button>
            )}
          </div>
        </div>
      ))}

      <div className="go-to-cart-fixed">
        <button className="cart-buttons" onClick={() => navigate('/cart')}>
          Go to Cart
        </button>
      </div>
    </div>
  );
}


