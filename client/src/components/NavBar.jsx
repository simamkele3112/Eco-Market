
import { Link } from 'react-router-dom';
const NavBar=()=>{


    return<>
 
 <div className="second-nav d-flex justify-content-between align-items-center g-3 container-fluid pb-3  container  bg-success">
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
    </>
}

export default NavBar;