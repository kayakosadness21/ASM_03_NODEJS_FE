import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import DetailPage from "./components/pages/DetailPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ShopPage from "./components/pages/ShopPage";
import Order from "./components/pages/Order";
import OrderDetail from "./components/pages/OrderDetail";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   return localStorage.clear();

  // }, []);
  const { isLoggedIn } = useSelector((state) => state.logInReducer);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/checkout" element={isLoggedIn && <CheckoutPage />} />
      <Route path="/order" element={isLoggedIn && <Order />} />
      <Route path="/order/detail/:id" element={isLoggedIn && <OrderDetail />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/detail/:productId" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
