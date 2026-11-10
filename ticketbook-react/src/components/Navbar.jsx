import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTicketBook } from '../context/TicketBookContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { selectedMall } = useTicketBook();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header" id="siteHeader">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to={currentUser ? '/mall' : '/login'} className="brand-logo">
          <div className="brand-icon">🎟️</div>
          <div className="brand-name">
            Ticket<span>Book</span>
          </div>
        </Link>

        {/* Selected Mall Pill (Shown for non-admin users) */}
        {currentUser && currentUser.role !== 'admin' && (
          <div
            className="nav-mall-pill"
            id="navMallPill"
            onClick={() => navigate('/malls')}
            title="Change Mall"
          >
            <span>📍</span>
            <span id="navMallName">
              {selectedMall ? selectedMall.name : 'Select Mall'}
            </span>
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>▼</span>
          </div>
        )}

        {/* Dynamic Navigation Links */}
        <ul className="nav-links" id="navLinks">
          {currentUser ? (
            currentUser.role === 'admin' ? (
              <>
                <li>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                  >
                    ⚡ Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mall"
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                  >
                    Preview Mall
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/mall"
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/events"
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                  >
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-bookings"
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                  >
                    My Bookings
                  </NavLink>
                </li>
              </>
            )
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* User Profile / Actions */}
        <div className="nav-actions" id="navActions">
          {currentUser ? (
            <>
              <div className="user-badge">
                <div className="user-avatar">
                  {(currentUser.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, lineHeight: 1.1 }}>
                    {currentUser.name}
                  </span>
                  <span className={`role-tag ${currentUser.role}`}>
                    {currentUser.role}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
