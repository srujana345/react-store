import React, { useContext } from "react";
import "./Products.css";
import { appContext } from "../App";

export default function Products() {
  const { products, cart, setCart } = useContext(appContext);

  const addToCart = (id) => {
    if (!cart[id]) setCart({ ...cart, [id]: 1 });
  };

  // const increment = (id) => {
  //   setCart({ ...cart, [id]: cart[id] + 1 });
  // };

  // const decrement = (id) => {
  //   if (cart[id] > 1) {
  //     setCart({ ...cart, [id]: cart[id] - 1 });
  //   } else {
  //     const newCart = { ...cart };
  //     delete newCart[id];
  //     setCart(newCart);
  //   }
  // };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <img src={product.url} alt={product.name} className="product-image" />
          <h2 className="product-title">{product.name}</h2>
          <p className="product-desc">{product.desc}</p>
          {/* <p className="product-price">₹{product.price}</p> */}

          {/* Removed quantity controls for this view */}
          {/* {cart[product._id] > 0 ? (
            <div className="product-quantity">
              <button className="qty-btn" onClick={() => decrement(product._id)}>-</button>
              <span>{cart[product._id]}</span>
              <button className="qty-btn" onClick={() => increment(product._id)}>+</button>
            </div>
          ) : ( */}
            <button className="add-to-cart-btn" onClick={() => addToCart(product._id)}>
              View items
            </button>
          {/* )} */}
        </div>
      ))}
    </div>
  );
}
