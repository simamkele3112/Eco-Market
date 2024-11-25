

import React from 'react';

const MainNavBar = () => {
  return (
    <>
      <header className="bg-success text-white">
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
          <div className="container">
            <a className="navbar-brand text-white" href="#">
              {/* Font Awesome icon */}
              <i className="fas fa-leaf"></i> Eco Friendly Market Place
            </a>
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
                  <a className="nav-link active text-white" aria-current="page" href="#">
                    Home
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sell
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-box-open"></i> Items
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-car"></i> Vehicles
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-home"></i> Home for Sale or Rent
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Buy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <a className="text-light" href="./User-profile.html">
              <i className="fas fa-user fs-3"></i>
            </a>
          </div>
        </nav>

        <hr className="text-white" />

        <div className="second-nav d-flex justify-content-between align-items-center g-3 container-fluid pb-3">
          <div className="dropdowns d-flex">
            <div className="dropdown me-3">
              <a
                className="btn btn-dark dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="#">
                    Price low - Price High
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Most Relevant
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Recommended
                  </a>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <a
                className="btn btn-dark btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="#">
                    Electronics
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Furniture
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Clothes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Cars
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Machinery
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Search button and input field */}
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

          {/* Location */}
          <a href="#" target="_blank" className="text-white">
            <i className="fas fa-map-marker-alt"></i> Cape Town
          </a>
        </div>
      </header>
    </>
  );
};

export default MainNavBar;
