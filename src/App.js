import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Orders from "./components/Orders";
import { createContext, use, useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryItems from "./pages/CategoryItems";

export const appContext = createContext();
function App(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const API = process.env.REACT_APP_API;

  const fetchProducts = async () => {
    try {
      const url = `${API}/api/product/showproducts`;
      const result = await axios.get(url);
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <BrowserRouter>
      <appContext.Provider
        value={{
          users,
          setUsers,
          user,
          setUser,
          products,
          setProducts,
          cart,
          setCart,
          orders,
          setOrders,
        }}
      >
        <Header />
        <Routes>
          <Route index element={<Products />} />
          <Route path="/" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/category/:category" element={<CategoryItems />} />

        </Routes>
        <Footer />
      </appContext.Provider>
    </BrowserRouter>
  );
}
export default App;
