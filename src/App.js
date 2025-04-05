import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CustomerRegistration from "./CustomerRegistration1"; 
import UserRegistration from "./UserRegistration";
import CustomerList from "./CustomerList"
import EditCustomer from "./EditCustomer"
import TrainerDashBoard from "./TrainerDashBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/customer-registration" element={<CustomerRegistration />} /> {/* Correct Route */}
      <Route path="/register" element={<UserRegistration />} /> {/* Updated Route */}
      <Route path="/customerList" element={<CustomerList />} />
      <Route path="/edit-customer/:id" element={<EditCustomer />} />
      <Route path="/trainers" element={<TrainerDashBoard />} />
    </Routes>
  );
}

export default App;
