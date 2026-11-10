import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTicketBook } from '../context/TicketBookContext';
import EventCard from '../components/EventCard';

export default function EventsPage() {
  const { events, malls, selectedMall } = useTicketBook();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMallFilter, setSelectedMallFilter] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  // Sync category if URL parameter changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setCategory(cat);
    }
  }, [searchParams]);

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  const handleReset = () => {
    setCategory('All');
    setSearchQuery('');
    setSelectedMallFilter('All');
    setPriceRange('All');
    setSelectedDate('');
    setSearchParams({});
  };

  const filteredEvents = events.filter((e) => {
    // Category Filter
    if (category !== 'All' && e.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    // Search Filter
    const q = searchQuery.toLowerCase().trim();
    if (
      q &&
      !e.name.toLowerCase().includes(q) &&
      !e.venue.toLowerCase().includes(q) &&
      !e.mall.toLowerCase().includes(q)
    ) {
      return false;
    }
    // Mall Filter
    if (selectedMallFilter !== 'All' && e.mall !== selectedMallFilter) {
      return false;
    }
    // Price Filter
    if (priceRange === 'under300' && e.price >= 300) return false;
    if (priceRange === '300to600' && (e.price < 300 || e.price > 600)) return false;
    if (priceRange === 'above600' && e.price <= 600) return false;
    // Date Filter
    if (selectedDate && e.date !== selectedDate) return false;

    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Browse All Events & Shows</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Filter shows by category, mall, price, or date
        </p>
      </div>

      {/* Category Chips */}
      <div className="category-nav-bar" id="browseCategoryChips">
        <button
          type="button"
          className={`chip-btn ${category === 'All' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('All')}
        >
          All Categories
        </button>
        <button
          type="button"
          className={`chip-btn ${category === 'Movies' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('Movies')}
        >
          🎬 Movies
        </button>
        <button
          type="button"
          className={`chip-btn ${category === 'Music' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('Music')}
        >
          🎵 Music
        </button>
        <button
          type="button"
          className={`chip-btn ${category === 'Comedy' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('Comedy')}
        >
          🎤 Comedy
        </button>
        <button
          type="button"
          className={`chip-btn ${category === 'Sports' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('Sports')}
        >
          ⚽ Sports
        </button>
        <button
          type="button"
          className={`chip-btn ${category === 'Theatre' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('Theatre')}
        >
          🎭 Theatre
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="form-group" style={{ margin: 0 }}>
          <label>Search Keyword</label>
          <input
            type="text"
            className="filter-input"
            placeholder="Search by name, artist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label>Mall</label>
          <select
            className="filter-input"
            value={selectedMallFilter}
            onChange={(e) => setSelectedMallFilter(e.target.value)}
          >
            <option value="All">All Malls</option>
            {malls.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label>Price Range</label>
          <select
            className="filter-input"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="All">Any Price</option>
            <option value="under300">Under ₹300</option>
            <option value="300to600">₹300 - ₹600</option>
            <option value="above600">Above ₹600</option>
          </select>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label>Date</label>
          <input
            type="date"
            className="filter-input"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
          style={{ height: '42px', alignSelf: 'flex-end' }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Showing{' '}
        <strong style={{ color: 'var(--text-main)' }}>
          {filteredEvents.length}
        </strong>{' '}
        shows
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} showMallName={true} />
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px',
              color: 'var(--text-muted)'
            }}
          >
            <h3>No events match your criteria</h3>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              style={{ marginTop: '12px' }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
