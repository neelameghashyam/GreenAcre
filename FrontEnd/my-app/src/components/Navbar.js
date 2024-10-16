import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../bgImgs/Green_Acre.png'; // Adjust the path as needed
import accountIcon from '../bgImgs/account.png'; // Import the account icon
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css'; // Import custom CSS for additional styles

const Navbar = () => {
  const { state, handleLogout } = useContext(AuthContext);

  const logout = () => {
    handleLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow thin-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Green Acre" style={{ height: '60px' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle post-property-btn btn" 
                id="postPropertyDropdown" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Post Property
              </button>
              <ul className="dropdown-menu" aria-labelledby="postPropertyDropdown">
                <li>
                  <Link className="dropdown-item" to="/property">Create Property</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/auction">Create Auction</Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle btn" 
                id="auctionDropdown" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Properties
              </button>
              <ul className="dropdown-menu" aria-labelledby="auctionDropdown">
                <li>
                  <Link className="dropdown-item" to="/home">Properties</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/auctions">Auctions</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/completed-auctions">Completed Auctions</Link>
                </li>
              </ul>
            </li>

            {/* Check if user exists and has a role */}
            {(state.user && (state.user.role === 'admin' || state.user.role === 'moderator')) && (
              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle btn" 
                  id="articleDropdown" 
                  type="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Articles
                </button>
                <ul className="dropdown-menu" aria-labelledby="articleDropdown">
                  <li>
                    <Link className="dropdown-item" to="/article">Create Article</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/articles">All Articles</Link>
                  </li>
                </ul>
              </li>
            )}

            {state.isLoggedIn ? (
              <>
                {state.user && state.user.role === 'admin' && (
                  <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                  </li>
                  <li className="nav-item">
                  <button className="btn btn-danger" onClick={logout}>Logout</button>
                </li>
                </>
                )}
                {state.user && state.user.role === 'moderator' && (
                  <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/moderator-dashboard">Moderator Dashboard</Link>
                  </li>
                  <li className="nav-item">
                  <button className="btn btn-danger" onClick={logout}>Logout</button>
                </li>
                </>
                )}
                {state.user && state.user.role === 'user'&&(
                    <li className="nav-item dropdown">
                    <button 
                      className="nav-link dropdown-toggle btn account-btn" 
                      id="accountDropdown" 
                      type="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      <div className="avatar-container">
                        <img src={accountIcon} alt="Account" style={{ height: '30px', width: '30px' }} /> {/* Account Icon */}
                      </div>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                      <li>
                        <Link className="dropdown-item" to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/my-properties">My Properties</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/my-auctions">My Auctions</Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={logout}>Logout</button>
                      </li>
                    </ul>
                  </li>
                )}
               
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary" to="/register">Register</Link>
                </li>
              </>
            )}

            
          
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;