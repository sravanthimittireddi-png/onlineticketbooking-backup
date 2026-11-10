import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      showToast('Please enter both email and password', 'warning');
      return;
    }

    const res = login(email, password, role);
    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/malls');
      }
    }
  };

  const fillDemo = (demoRole) => {
    if (demoRole === 'admin') {
      setEmail('admin@ticketbook.com');
      setPassword('admin123');
      setRole('admin');
      showToast('Demo admin credentials filled', 'info');
    } else {
      setEmail('user@ticketbook.com');
      setPassword('user123');
      setRole('user');
      showToast('Demo user credentials filled', 'info');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <div className="brand-logo" style={{ justifyContent: 'center' }}>
          <div className="brand-icon">🎟️</div>
          <div className="brand-name">
            Ticket<span>Book</span>
          </div>
        </div>
        <p className="auth-tagline">“Book Your Experience. Enjoy Every Moment.”</p>
        <h1 style={{ fontSize: '1.5rem', marginTop: '10px' }}>Welcome Back</h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="loginRole">Account Role</label>
          <div className="input-wrap">
            <span className="input-icon">👤</span>
            <select
              id="loginRole"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User (Standard Patron)</option>
              <option value="admin">Admin (System Manager)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="loginEmail">Email Address</label>
          <div className="input-wrap">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              id="loginEmail"
              className="form-control"
              placeholder="name@ticketbook.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="loginPassword">
            Password
            <span
              style={{ fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              onClick={() =>
                alert('Demo Passwords:\nUser: user123\nAdmin: admin123')
              }
            >
              Need Help?
            </span>
          </label>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="loginPassword"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="pwd-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block btn-lg"
          style={{ marginTop: '6px' }}
        >
          <span>Sign In to TicketBook</span>
          <span>→</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-block"
          style={{ marginTop: '10px' }}
          onClick={() => navigate('/signup')}
        >
          Create New Account
        </button>
      </form>

      {/* Quick Autofill for Reviewers */}
      <div className="demo-accounts">
        <div
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase'
          }}
        >
          ⚡ Quick Fill for Evaluators
        </div>
        <div className="demo-pills">
          <button
            type="button"
            className="demo-btn"
            onClick={() => fillDemo('user')}
          >
            👤 User Demo
          </button>
          <button
            type="button"
            className="demo-btn"
            onClick={() => fillDemo('admin')}
          >
            ⚡ Admin Demo
          </button>
        </div>
      </div>
    </div>
  );
}
