import React from "react";
import { useNavigate } from "react-router-dom"
import "./dashboard.css"; // Make sure this CSS file is created and linked properly
import dashboard from "./images/dashboard.jpg";
import dashboard2 from "./images/dashboard2.jpg";
import gym2 from "./images/gym2.jpg";
// import dd3 from "./images/dd3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandRock,
  faDumbbell,
  faWeightHanging,
  faBiking,
  faCar,
  faHeart,
  faPersonRunning,
  faStar,
  faArrowsAlt,
  faBicycle,
} from '@fortawesome/free-solid-svg-icons';



const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h3>Everlast Gym</h3>
        </div>
        <div className="navbar-links">
          <a href="/home">Home</a>
          <a href="#membership">Membership</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Main Content */}
      <section className="main-content" style={{ backgroundImage: `url(${gym2})` }}>
        <div className="content-overlay">
          <h2>Welcome to the Dashboard</h2>

          <div className="membership-details">
            <h3>MEMBERSHIPS FROM JUST £35</h3>
            <p>CHECK OUT OUR NEWLY ELEVATED GYM!</p>
          </div>

          <div className="gym-info">
            <h3>Opening Hours</h3>
            <ul>
              <li>Mon - Thurs: 06:00 - 22:00</li>
              <li>Fri: 06:00 - 21:00</li>
              <li>Sat - Sun: 08:00 - 18:00</li>
            </ul>
          </div>

          <div className="contact-info">
            <h3>Contact Us</h3>
            <p><strong>Phone:</strong> 0343 909 2653</p>
            <p><strong>Email:</strong> <a href="mailto:Manager.Cheltenham2FIT@everlastgyms.com">Manager.Cheltenham2FIT@everlastgyms.com</a></p>
            <p><strong>Location:</strong> 16 The Brewery Quarter, Henrietta Street, Cheltenham, GL50 4FA</p>
          </div>

          <div className="dashboard-buttons">
            <button onClick={() => navigate("/customerList")}>View Customer List</button>
            <button onClick={() => navigate("/customer-registration")}>Register Customer</button>
            <button onClick={() => navigate("/trainers")}>Trainers</button>
            <button onClick={() => navigate("/trainer-registration")}>Trainer Registration</button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us" style={{ backgroundImage: `url(${dashboard2})` }}>
        <div className="about-overlay">
          <h2>About Us</h2>
          <p>
            Born in the Bronx in 1910, Everlast is synonymous with greatness.
            Our Cheltenham gym offers an undisputed fitness experience at an unbeatable price,
            with memberships from £35 a month. We have male and female changing facilities on site,
            private showers, and plenty of lockers to store your belongings.
          </p>
          <p>
            Come out fighting by joining a gym that offers you a variety of ways to achieve your goals.
            Take full advantage of the latest cardio, HiiT, functional, free weight, and resistance equipment.
            Take a swim in our swimming pool or unwind in our sauna and steam rooms. We also offer a range of
            group training classes to improve your strength, stamina, and wellbeing.
          </p>
        </div>
      </section>

      {/* Personal Training Section */}
      <section className="personal-training">
        <h2>Personal Training - Cheltenham</h2>
        <h3>Why Personal Training?</h3>
        <p>
          The greatest champions of our lifetime would not have been so without their trainer by their side.
          Whatever your fitness goals are, our dedicated team of Personal Trainers will help you find the courage,
          clarity, and commitment to smash through them.
        </p>
        <p>
          Our friendly and knowledgeable team of Personal Trainers at Cheltenham are here to help you formulate a winning
          strategy and achieve more than you ever thought was possible.
        </p>
      </section>

      {/* Membership Section */}
      <section className="membership">
        <h3>Join Now</h3>
        <button onClick={() => navigate("/join-now")}>Join Now</button>
      </section>
      <section className="elevation-section">
        <div className="elevation-content">
          <h3>THE CHELTENHAM ELEVATION</h3>
          <p>Refurbished main gym including new décor, flooring and lighting</p>
          <p>
            A range of new equipment including cardio, free-weights, Olympic weightlifting platforms and functional kit.
          </p>
          <p>
            Brand new studios including the introduction of our elevated group training concepts: 
            Hustle, Haymaker, Cranked, Breathe, Backbone & Apex
          </p>
        </div>
      </section>


      {/* Facilities Section */}
      <section className="facilities">
        <h3>CHELTENHAM HC FACILITIES</h3>
        <div className="facilities-list">
          <ul>
            <li><strong><FontAwesomeIcon icon={faHandRock} /></strong> Hand Grip - Resistance Area</li>
            <li><strong><FontAwesomeIcon icon={faWeightHanging} /></strong> Kettle Bell - Functional Training</li>
            <li><strong><FontAwesomeIcon icon={faDumbbell} /></strong> Dumbbell - Free Weights</li>
            <li><strong><FontAwesomeIcon icon={faStar} /></strong> Muscle - Olympic Platforms</li>
            <li><strong><FontAwesomeIcon icon={faBiking} /></strong> Bike - Group Cycling</li>
            <li><strong><FontAwesomeIcon icon={faCar} /></strong> Car - Car Parking</li>
            <li><strong><FontAwesomeIcon icon={faDumbbell} /></strong> Free Weights - Personal Training</li>
            <li><strong><FontAwesomeIcon icon={faPersonRunning} /></strong> Bike Machine - Cardio/HIIT Training</li>
            <li><strong><FontAwesomeIcon icon={faHeart} /></strong> Heart - Myzone Integration</li>
            <li><strong><FontAwesomeIcon icon={faArrowsAlt} /></strong> Multi-Station - Functional Training</li>
          </ul>
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
    </div>
  );
};

export default Dashboard;
