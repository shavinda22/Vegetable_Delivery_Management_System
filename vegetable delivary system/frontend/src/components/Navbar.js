import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

export default function Navbar() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container-fluid">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_62FSY0tNzLi2g5xCpP8o09g9Yja4kQwpY7D-iHLXwwXqHY9"
              alt="logo"
            />

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/policy">
                    Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
