import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from './Cart';
import { usecart } from './ContextReducer';

export default function Navbar() {
  const data = usecart();
  const [cartview, setcartview] = useState(false);
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">

        <img 
          src="c47964b8a82be22fedadb42e05ac335e.png" 
          alt="Logo" 
          style={{ height: "80px", objectFit: "cover" }} 
        />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"  // Fixed ID here
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link fs-5 active ms-3" aria-current="page" to="/">Home</Link>
            </li>
            {localStorage.getItem("authtoken") && (
              <li className="nav-item">
                <Link className="nav-link fs-5 active ms-3" to="/myorderdata">My Orders</Link>
              </li>
            )}
          </ul>

          {/* Right side buttons aligned to right */}
          {!localStorage.getItem("authtoken") ? (
            <div className="d-flex ms-auto">
              <Link className="nav-link bg-white text-success mx-1 rounded" to="/login">Login</Link>
              <Link className="nav-link bg-white text-success mx-1 rounded" to="/createuser">Sign Up</Link>
            </div>
          ) : (
            <div className="d-flex ms-auto align-items-center">
              <button
                className="btn btn-light text-success mx-2 position-relative"
                onClick={() => setcartview(true)}
                style={{ minWidth: "110px" }}
              >
                My Cart{" "}
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {data.length}
                </Badge>
              </button>

              {cartview && (
                <Modal onClose={() => setcartview(false)}>
                  <Cart />
                </Modal>
              )}

              <button
                className="btn btn-light text-danger mx-2"
                onClick={handlelogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
