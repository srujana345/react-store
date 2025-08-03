import React, { useState, useEffect, useContext } from "react";
import { appContext } from "../App";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { products, cart, setCart, user } = useContext(appContext);
  const navigate = useNavigate();
  const [orderValue, setOrderValue] = useState(0);
  const API = process.env.REACT_APP_API;

  const handleDelete = (id) => {
    const updatedCart = { ...cart };
    delete updatedCart[id];
    setCart(updatedCart);
  };

  const increment = (id) => {
    setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  };

  const decrement = (id) => {
    if (cart[id] > 1) {
      setCart({ ...cart, [id]: cart[id] - 1 });
    } else {
      handleDelete(id);
    }
  };

  const placeOrder = async () => {
    try {
      const order = {
        email: user?.email,
        items: cart,
        total: orderValue,
      };
      const url = `${API}/api/order/neworder`;
      await axios.post(url, order);
      setCart({});
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  useEffect(() => {
    setOrderValue(
      products.reduce((sum, value) => {
        return sum + value.price * (cart[value._id] ?? 0);
      }, 0)
    );
  }, [cart, products]);

  return (
    <div
      className="cart-container"
      style={{ background: "linear-gradient(45deg, #6F4e37, #E1B995 100%)" }}
    >
      <h2>My Cart</h2>
      {Object.keys(cart).length > 0 ? (
        <>
          {products.map(
            (value) =>
              cart[value._id] > 0 && (
                <div className="cart-item" key={value._id}>
                  <div className="cart-item-name">{value.name}</div>
                  <div className="cart-item-price">₹{value.price}</div>
                  <div className="cart-qty-controls">
                    <button onClick={() => decrement(value._id)}>-</button>
                    <span className="cart-qty">{cart[value._id]}</span>
                    <button onClick={() => increment(value._id)}>+</button>
                  </div>
                  <div className="cart-item-price">
                    ₹{(value.price * cart[value._id]).toFixed(2)}
                  </div>
                  <button
                    className="cart-delete-btn"
                    onClick={() => handleDelete(value._id)}
                  >
                    Delete
                  </button>
                </div>
              )
          )}
          <div className="order-value">Order Value: ₹{orderValue.toFixed(2)}</div>
          <div>
            {user?.email ? (
              <button
                className="order-btn"
                onClick={placeOrder}
                disabled={orderValue === 0}
              >
                Place Order
              </button>
            ) : (
              <button className="order-btn" onClick={() => navigate("/login")}>
                Login to Order
              </button>
            )}
          </div>
        </>
      ) : (
        <h5 className="empty-cart">Your cart is Empty</h5>
      )}
    </div>
  );
}
