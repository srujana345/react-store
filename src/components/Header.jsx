import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { appContext } from "../App";

export default function Header() {
  const { user, setUser, cart, products, orders } = useContext(appContext);
  const items = products.filter((value) => cart[value._id] > 0);

  const [myOrder, setMyOrder] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    setMyOrder(orders.filter((value) => value.email === user.email));
  }, [orders, user]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setShowDropdown(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // const toggleMenu = () => {
  //   setMenuOpen(prev => {
  //     if (prev) setShowDropdown(false);
  //     return !prev;
  //   });
  // };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeMenuAndDropdown = () => {
    setMenuOpen(false);
    setShowDropdown(false);
  };

  return (
    <div className="header">
      <div className="logo-title">
        <img
          src="/images/coffee-cup-logo-icon-vector-20329714.jpg"
          alt="Qaffeine Logo"
          className="logo-img"
        />
        <h1>Qaffeine</h1>
      </div>

      {/* Hamburger */}
      {/* <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div> */}

      <nav ref={navRef} className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenuAndDropdown}>
          Home
        </Link>

        {/* Dropdown */}
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            Menu
          </button>

          <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
            <Link to="/category/Hot" onClick={closeMenuAndDropdown}>
              Hot
            </Link>
            <Link to="/category/Cold" onClick={closeMenuAndDropdown}>
              Cold
            </Link>
            <Link to="/category/Iced" onClick={closeMenuAndDropdown}>
              Bubble Tea
            </Link>
          </div>
        </div>

        <Link to="/cart" onClick={closeMenuAndDropdown}>
          Cart
        </Link>
        <Link to="/orders" onClick={closeMenuAndDropdown}>
          Orders
        </Link>

        {user.email ? (
          <Link
            to="/login"
            onClick={() => {
              setUser({ name: "", email: "", password: "" });
              closeMenuAndDropdown();
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" onClick={closeMenuAndDropdown}>
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}
