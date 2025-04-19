import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./EditCustomer.css"

// ✅ Sample Navbar component
const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Fitness Club</h1>
      <div>
        <a href="/" className="mr-4 hover:underline">Home</a>
        <a href="/customers" className="hover:underline">Customers</a>
      </div>
    </div>
  </nav>
);

// ✅ Sample Footer component
const Footer = () => (
  <footer className="bg-gray-800 text-white py-4 mt-10">
    <div className="container mx-auto text-center">
      <p>&copy; 2025 Fitness Club. All rights reserved.</p>
    </div>
  </footer>
);

function EditCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:8090/api/customers/get/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Customer not found");
        return res.json();
      })
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customer:", err);
        setError("Error fetching customer details");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!customer?.firstName) errors.firstName = "First name is required";
    if (!customer?.lastName) errors.lastName = "Last name is required";
    if (!customer?.address || customer.address.trim().length === 0) {
      errors.address = "Address is required and cannot be just spaces";
    }
    
    if (!customer?.phone || !/^\d{10}$/.test(customer.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (customer?.age <= 0 || customer?.age > 120)
      errors.age = "Age must be between 1 and 120";
    if (!customer?.weight || isNaN(parseFloat(customer.weight))) {
      errors.weight = "Weight must be a valid number";
    } else if (customer.weight < 30 || customer.weight > 200) {
      errors.weight = "Weight must be between 30 and 200 kg";
    }
    if (!customer?.height || isNaN(customer.height) || customer.height < 50 || customer.height > 200) {
      errors.height = "Height must be between 50 and 200 cm";
    }
    if (customer?.specialization.length < 3)
      errors.specialization = "Specialization must be at least 3 characters long";
    if (customer?.trainingPeriod <= 1)
      errors.trainingPeriod = "Training must be at least 1 month long";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch(`http://localhost:8090/api/customers/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then((updatedCustomer) => {
        return fetch(
          `http://localhost:8090/api/customers/${id}/assign-trainer/${updatedCustomer.specialization}`,
          { method: "PUT" }
        )
          .then((res) => {
            if (!res.ok) throw new Error("Failed to assign trainer");
            return res.json();
          })
          .then((trainerAssignedCustomer) => {
            setCustomer(trainerAssignedCustomer);
            setShowToast(true);
            console.log(customer);
            console.log("Length:", customer.address.trim().length);
          
            // Hide toast after 3 seconds
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          })
          
      })
      .catch((error) => {
        console.error("Error updating customer or assigning trainer:", error);
        alert("An error occurred while updating the customer or assigning the trainer.");
      });
  };

  const handleShowPayment = () => {
    navigate(`/payment/${id}`, {
      state: {
        trainingPeriod: customer.trainingPeriod,
        couponCode: customer.couponCode || "",
      }
    });
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-100 py-10">
        <div className="container mx-auto bg-white p-8 shadow-lg rounded-lg max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Edit Customer</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'First Name', name: 'firstName' },
                { label: 'Last Name', name: 'lastName' },
                { label: 'Address', name: 'address' },
                { label: 'Phone', name: 'phone' },
                { label: 'Weight', name: 'weight' },
                { label: 'Height', name: 'height' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block font-medium">{label}:</label>
                  <input 
                    type="text"
                    name={name}
                    value={customer?.[name] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                  {validationErrors[name] && (
                    <p className="text-red-500 text-sm">{validationErrors[name]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block font-medium">Gender:</label>
                <select
                  name="gender"
                  value={customer?.gender || "Male"}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={customer?.age || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                {validationErrors.age && <p className="text-red-500 text-sm">{validationErrors.age}</p>}
              </div>

              <div>
                <label className="block font-medium">Specialization:</label>
                <select
                  name="specialization"
                  value={customer?.specialization || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Weight-Gain">Weight-Gain</option>
                  <option value="Weight-Loss">Weight-Loss</option>
                  <option value="Fitness">Fitness</option>
                </select>
                {validationErrors.specialization && (
                  <p className="text-red-500 text-sm">{validationErrors.specialization}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Training Period (months):</label>
                <select
                  name="trainingPeriod"
                  value={customer?.trainingPeriod || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
                </select>
                {validationErrors.trainingPeriod && (
                  <p className="text-red-500 text-sm">{validationErrors.trainingPeriod}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Coupon Code:</label>
                <input
                  type="text"
                  name="couponCode"
                  value={customer?.couponCode || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="e.g. FIT10"
                />
              </div>

              <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-300"
              >
                Update Customer
              </button>


                <button
                  type="button"
                  onClick={handleShowPayment}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Show Payment
                </button>
              </div>
            </form>
            
          )}
        </div>
      </section>
      

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@everlastgym.com">Email Us</a></li>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Find a Gym</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Everlast Gym. All rights reserved.</p>
        </div>
      </footer>
      {showToast && (
        <div className="toast">
          Customer updated and trainer {customer.trainerName} assigned successfully!
        </div>
      )}

    </>
  );
}

export default EditCustomer;
