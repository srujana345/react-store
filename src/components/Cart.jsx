import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { appContext } from "../App"
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Cart() {
  const { products, cart, setCart, orders, setOrders, user } =
    useContext(appContext);
  const Navigate = useNavigate();
  const [orderValue, setOrderValue] = useState(0);
  const API = process.env.REACT_APP_API;
  const handleDelete = (id) => {
    setCart({ ...cart, [id]: 0 });
  };
  const increment = (id) => {
    setCart({ ...cart, [id]: cart[id] + 1 });
  };
  const decrement = (id) => {
    setCart({ ...cart, [id]: cart[id] - 1 });
  };
  const placeOrder = async () => {
    const order = {
      email: user.email,
      items: cart,
      total: orderValue,
    };
    const url = `${API}/api/order/neworder`;
    const result = await axios.post(url,order);
    // setOrders(result.data);

    // setOrders([
    //   ...orders,
    //   {
    //     email: user.email,
    //     items: cart,
    //     total: orderValue,
    //   },
    // ]);

    setCart({});
    Navigate("/orders");
  };
  useEffect(() => {
    setOrderValue(
      products.reduce((sum, value) => {
        return sum + value.price * (cart[value._id] ?? 0);
      }, 0)
    );
  }, [cart]);
  return (
  <div className="cart-container" style={{ background: "linear-gradient(45deg,#6F4e37, #E1B995 100%)" }}>
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
                  {cart[value._id]}
                  <button onClick={() => increment(value._id)}>+</button>
                </div>
                <div className="cart-item-price">
                  ₹{value.price * cart[value._id]}
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
        <div className="order-value">Order Value: ₹{orderValue}</div>
        <div>
          {user.email ? (
            <button className="order-btn" onClick={placeOrder}>
              Place Order
            </button>
          ) : (
            <button
              className="order-btn"
              onClick={() => Navigate("/login")}
            >
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
