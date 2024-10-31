import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
import TopUp from "./pages/transaction/TopUp";
import Transaction from "./pages/transaction/ViewTransaction";
import Akun from "./pages/profile/Akun";
import EditAkun from "./pages/profile/EditAkun";
import Bayar from "./pages/transaction/Bayar";

function App() {
  const location = useLocation();
  const pathsWithNavbar = [
    "/dashboard",
    "/topup",
    "/transaction",
    "/akun",
    "/EditAkun",
    "/pembayaran",
  ];

  return (
    <div className="App">
      {pathsWithNavbar.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/EditAkun" element={<EditAkun />} />
        <Route path="/pembayaran" element={<Bayar />} />
      </Routes>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
