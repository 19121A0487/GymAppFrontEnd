// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import CustomerRegistration from "./components/CustomerRegistration1";
import UserRegistration from "./components/UserRegistration";
import CustomerList from "./components/CustomerList";
import EditCustomer from "./components/EditCustomer";
import TrainerDashBoard from "./components/TrainerDashBoard";
import PaymentDetails from "./components/PaymentDetails";
import Dashboard from "./components/DashBoard";
import TrainerRegistration from "./components/TrainerRegistration";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/customer-registration" element={<CustomerRegistration />} />
      <Route path="/register" element={<UserRegistration />} />
      <Route path="/customerList" element={<CustomerList />} />
      <Route path="/edit-customer/:id" element={<EditCustomer />} />
      <Route path="/trainers" element={<TrainerDashBoard />} />
      <Route path="/payment/:id" element={<PaymentDetails />} />
      <Route path="/trainer-registration" element={<TrainerRegistration />} />
    </Routes>
  );
}

export default App;
