import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const MainNavBar = () => {
  const location = useLocation(); // Get the current URL
  const currentPath = location.pathname; // Get the pathname

  // Check if the current path is '/' to display the second nav
  const showSecondNav = currentPath === '/';

  return (
    <>
      <header className="bg-success text-white">
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
          <div className="container">
            <span className="navbar-brand text-light">
              <i className="fas fa-leaf"></i> Eco Friendly Market Place
            </span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active text-white" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-white"
                    to="/sell"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sell
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/sell/items">
                        <i className="fas fa-box-open"></i> Items
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/sell/vehicles">
                        <i className="fas fa-car"></i> Vehicles
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/sell/homes">
                        <i className="fas fa-home"></i> Home for Sale or Rent
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/buy">
                    Buy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <Link className="text-light" to="/user-profile">
              <i className="fas fa-user fs-3"></i>
            </Link>
          </div>
        </nav>

        <hr className="text-white" />

        {/* Conditionally render NavBar */}
        {showSecondNav && <NavBar />}
      </header>
    </>
  );
};

export default MainNavBar;
