import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTicketBook } from '../context/TicketBookContext';
import { useToast } from '../context/ToastContext';
import { getFallbackImage } from '../utils/fallbackImage';

export default function MallSelectionPage() {
  const { malls, selectMall } = useTicketBook();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectMall = (mall) => {
    selectMall(mall);
    showToast(`Selected ${mall.name}`, 'success');
    navigate('/mall');
  };

  const filteredMalls = malls.filter((m) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q) ||
      (m.city && m.city.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <div className="mall-select-hero">
        <span className="badge badge-events" style={{ marginBottom: '8px' }}>
          Entertainment Hubs
        </span>
        <h1>Choose Your Mall</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Select your preferred entertainment mall destination
        </p>
        <div className="mall-search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search mall by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mall-grid" id="mallSelectGrid">
        {filteredMalls.map((mall) => (
          <div
            key={mall.id}
            className="mall-card"
            onClick={() => handleSelectMall(mall)}
            style={{ cursor: 'pointer' }}
          >
            <div className="mall-card-img-wrap">
              <img
                src={mall.image}
                alt={mall.name}
                className="mall-card-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getFallbackImage(mall.name, 'Mall');
                }}
              />
              <div className="mall-card-badge">★ {mall.rating}</div>
              <div className="mall-card-screens">{mall.screens} Screens</div>
            </div>
            <div className="mall-card-body">
              <h3 className="mall-card-title">{mall.name}</h3>
              <div className="mall-card-location">
                📍 {mall.location}, {mall.city}
              </div>
              <div className="mall-card-experience">✨ {mall.experience}</div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectMall(mall);
                }}
              >
                Explore Mall →
              </button>
            </div>
          </div>
        ))}
        {filteredMalls.length === 0 && (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px',
              color: 'var(--text-muted)'
            }}
          >
            <h3>No malls found matching "{searchTerm}"</h3>
          </div>
        )}
      </div>
    </div>
  );
}
