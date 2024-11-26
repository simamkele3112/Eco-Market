import React from 'react';
import { Link } from 'react-router-dom';

const MainNavBar = () => {
  return (
    <>
      <header className="bg-success text-white">
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
          <div className="container">
            
              <i className="fas fa-leaf"></i> Eco Friendly Market Place
           
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

        <div className="second-nav d-flex justify-content-between align-items-center g-3 container-fluid pb-3">
          <div className="dropdowns d-flex">
            <div className="dropdown me-3">
              <button
                className="btn btn-dark dropdown-toggle"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/filter/low-to-high">
                    Price low - Price High
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/filter/most-relevant">
                    Most Relevant
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/filter/recommended">
                    Recommended
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/categories/electronics">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categories/furniture">
                    Furniture
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categories/clothes">
                    Clothes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categories/cars">
                    Cars
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categories/machinery">
                    Machinery
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search for items"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="button">
              Search
            </button>
          </div>

          <Link to="/location" className="text-white">
            <i className="fas fa-map-marker-alt"></i> Cape Town
          </Link>
        </div>
      </header>
    </>
  );
};

export default MainNavBar;
