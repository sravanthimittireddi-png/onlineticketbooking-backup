import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTicketBook } from '../context/TicketBookContext';
import EventCard from '../components/EventCard';
import { getFallbackImage } from '../utils/fallbackImage';

export default function MallHomePage() {
  const { selectedMall, events } = useTicketBook();
  const navigate = useNavigate();

  if (!selectedMall) {
    navigate('/malls');
    return null;
  }

  // Filter shows available in this mall, or general shows
  const featuredEvents = events.filter((e) => e.featured);
  const movies = events.filter((e) => e.category === 'Movies');
  const music = events.filter((e) => e.category === 'Music');
  const comedy = events.filter((e) => e.category === 'Comedy');
  const sports = events.filter((e) => e.category === 'Sports');

  return (
    <div>
      {/* Mall Hero Section */}
      <div className="mall-hero">
        <img
          src={selectedMall.image}
          alt={selectedMall.name}
          className="mall-hero-bg"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getFallbackImage(selectedMall.name, 'Mall');
          }}
        />
        <div className="mall-hero-gradient"></div>
        <div className="mall-hero-content">
          <div className="mall-pill-tag">
            📍 {selectedMall.screens} Screens • {selectedMall.experience}
          </div>
          <h1 className="mall-hero-title">Discover. Book. Experience.</h1>
          <p className="mall-hero-tagline">
            {selectedMall.name} • {selectedMall.location}
          </p>
          <p className="mall-hero-desc">
            Experience the latest movies in IMAX 3D, live musical symphonies, and side-splitting comedy specials.
          </p>
          <div className="mall-hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/events')}
            >
              Explore All Events →
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/malls')}
            >
              Change Mall 📍
            </button>
          </div>
        </div>
      </div>

      {/* Category Nav Bar */}
      <div className="category-nav-bar">
        <button
          type="button"
          className="cat-pill active"
          onClick={() => navigate('/events?category=All')}
        >
          🌟 All Shows
        </button>
        <button
          type="button"
          className="cat-pill"
          onClick={() => navigate('/events?category=Movies')}
        >
          🎬 Movies
        </button>
        <button
          type="button"
          className="cat-pill"
          onClick={() => navigate('/events?category=Music')}
        >
          🎵 Music
        </button>
        <button
          type="button"
          className="cat-pill"
          onClick={() => navigate('/events?category=Comedy')}
        >
          🎤 Comedy
        </button>
        <button
          type="button"
          className="cat-pill"
          onClick={() => navigate('/events?category=Sports')}
        >
          ⚽ Sports
        </button>
      </div>

      {/* Featured Events */}
      <section className="events-section">
        <div className="section-header">
          <div>
            <h2>🔥 Featured Events</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Trending blockbusters & headline performances
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/events')}
          >
            View All →
          </button>
        </div>
        <div className="events-grid">
          {featuredEvents.length > 0 ? (
            featuredEvents.map((ev) => <EventCard key={ev.id} event={ev} />)
          ) : (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              No featured shows scheduled.
            </p>
          )}
        </div>
      </section>

      {/* Movies Section */}
      <section className="events-section">
        <div className="section-header">
          <div>
            <h2>🎬 Cinema & Movies</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Latest theatrical releases
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/events?category=Movies')}
          >
            View Movies →
          </button>
        </div>
        <div className="events-grid">
          {movies.length > 0 ? (
            movies.map((ev) => <EventCard key={ev.id} event={ev} />)
          ) : (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              No movies currently scheduled.
            </p>
          )}
        </div>
      </section>

      {/* Music Section */}
      <section className="events-section">
        <div className="section-header">
          <div>
            <h2>🎵 Music & Concerts</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Live symphonies and concerts
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/events?category=Music')}
          >
            View Music →
          </button>
        </div>
        <div className="events-grid">
          {music.length > 0 ? (
            music.map((ev) => <EventCard key={ev.id} event={ev} />)
          ) : (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              No music concerts currently scheduled.
            </p>
          )}
        </div>
      </section>

      {/* Comedy Section */}
      <section className="events-section">
        <div className="section-header">
          <div>
            <h2>🎤 Stand-up Comedy</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Laugh out loud with top stand-ups
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/events?category=Comedy')}
          >
            View Comedy →
          </button>
        </div>
        <div className="events-grid">
          {comedy.length > 0 ? (
            comedy.map((ev) => <EventCard key={ev.id} event={ev} />)
          ) : (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              No comedy shows currently scheduled.
            </p>
          )}
        </div>
      </section>

      {/* Sports Section */}
      <section className="events-section">
        <div className="section-header">
          <div>
            <h2>⚽ Sports Screenings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Stadium energy on 4K giant screens
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/events?category=Sports')}
          >
            View Sports →
          </button>
        </div>
        <div className="events-grid">
          {sports.length > 0 ? (
            sports.map((ev) => <EventCard key={ev.id} event={ev} />)
          ) : (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              No sports events currently scheduled.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
