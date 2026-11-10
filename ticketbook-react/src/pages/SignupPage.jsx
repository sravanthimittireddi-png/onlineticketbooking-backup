import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      showToast('Please fill all required fields', 'warning');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    const res = signup({ name, email, phone, password, role });
    if (res.success) {
      navigate('/login');
    }
  };

  return (
    <div className="auth-wrapper" style={{ maxWidth: '500px' }}>
      <div className="auth-header">
        <div className="brand-logo" style={{ justifyContent: 'center' }}>
          <div className="brand-icon">🎟️</div>
          <div className="brand-name">
            Ticket<span>Book</span>
          </div>
        </div>
        <p className="auth-tagline">“Book Your Experience. Enjoy Every Moment.”</p>
        <h1 style={{ fontSize: '1.5rem', marginTop: '10px' }}>Create Account</h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="signupRole">Select Role</label>
          <div className="input-wrap">
            <span className="input-icon">👤</span>
            <select
              id="signupRole"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="signupName">Full Name</label>
          <div className="input-wrap">
            <span className="input-icon">🏷️</span>
            <input
              type="text"
              id="signupName"
              className="form-control"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="signupEmail">Email Address</label>
          <div className="input-wrap">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              id="signupEmail"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="signupPhone">Phone Number</label>
          <div className="input-wrap">
            <span className="input-icon">📱</span>
            <input
              type="tel"
              id="signupPhone"
              className="form-control"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="signupPassword">Password</label>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              id="signupPassword"
              className="form-control"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="signupConfirmPassword">Confirm Password</label>
          <div className="input-wrap">
            <span className="input-icon">🔑</span>
            <input
              type="password"
              id="signupConfirmPassword"
              className="form-control"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block btn-lg"
          style={{ marginTop: '6px' }}
        >
          <span>Register Account</span>
          <span>→</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-block"
          style={{ marginTop: '10px' }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
}
