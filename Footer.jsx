import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <Link to="/mall" className="brand-logo">
            <div className="brand-icon" style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}>🎟️</div>
            <div className="brand-name" style={{ fontSize: '1.2rem' }}>Ticket<span>Book</span></div>
          </Link>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>“Book Your Experience. Enjoy Every Moment.”</p>
        </div>
        <div className="footer-bottom">
          <p>© 2026 TicketBook. Converted to React with Reusable Components & React Router.</p>
          <p>Zero external UI dependencies • Full LocalStorage Persistence</p>
        </div>
      </div>
    </footer>
  );
}
