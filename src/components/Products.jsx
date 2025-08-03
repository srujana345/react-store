import React from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  // Define your category cards data here
  const categories = [
    {
      name: "Hot",
      description: "Hot, bold, and ready to steal your heart—one sip at a time.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlFqNY3JAPNQxCIHkDxm0zQD1mjNOmDpABlA&s", // replace with your image URL
      category: "Hot",
    },
    {
      name: "Cold",
      description: "Cool, smooth, and impossible to resist — just like your type.",
      image: "https://www.shutterstock.com/image-photo/black-iced-coffee-beans-on-600nw-2481549469.jpg", // replace with your image URL
      category: "Cold",
    },
    {
      name: "Bubble Tea",
      description: "Chilled perfection to refresh your day.",
      image: "https://info.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/bubble-tea.jpg", // replace with your image URL
      category: "Iced",
    },
  ];

  return (
    <div className="product-grid">
      {categories.map((item) => (
        <div className="product-card" key={item.category}>
          <img src={item.image} alt={item.name} className="product-image" />
          <h2 className="product-title">{item.name}</h2>
          <p className="product-desc">{item.description}</p>
          <button
            className="add-to-cart-btn"
            onClick={() => navigate(`/category/${item.category}`)}
          >
            View Items
          </button>
        </div>
      ))}
    </div>
  );
}
