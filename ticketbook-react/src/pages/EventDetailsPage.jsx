import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTicketBook } from '../context/TicketBookContext';
import { getFallbackImage } from '../utils/fallbackImage';

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { getEventById, selectEvent, getBookedSeatsForEvent } = useTicketBook();

  const event = getEventById(eventId);

  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Event not found</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/events')}
          style={{ marginTop: '16px' }}
        >
          ← Back to Events
        </button>
      </div>
    );
  }

  const bookedSeats = getBookedSeatsForEvent(event.id);
  const seatsLeft = Math.max(0, event.totalSeats - bookedSeats.length);

  const handleBookSeats = () => {
    selectEvent(event);
    navigate(`/seats/${event.id}`);
  };

  return (
    <div>
      <div style={{ marginBottom: '18px' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/events')}
        >
          ← Back to Events
        </button>
      </div>

      <div className="event-details-card">
        <div className="event-poster-pane">
          <img
            src={event.image}
            alt={event.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getFallbackImage(event.name, event.category);
            }}
          />
          <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
            <span className="badge badge-movie">{event.category}</span>
          </div>
        </div>

        <div className="event-info-pane">
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>{event.name}</h1>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}
          >
            <span className="seat-tag">{event.mall}</span>
            <span className="seat-tag">{event.venue}</span>
            <span className="seat-tag">{event.language || 'English / Hindi'}</span>
            <span className="seat-tag">{event.duration || '120 mins'}</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '6px' }}>About The Show</h4>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.92rem',
                lineHeight: 1.6
              }}
            >
              {event.description}
            </p>
          </div>

          <div className="event-specs-grid">
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-sub)'
                }}
              >
                Schedule
              </div>
              <div style={{ fontWeight: 700 }}>
                {event.date} • {event.time}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-sub)'
                }}
              >
                Availability
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: seatsLeft > 5 ? '#34d399' : '#f87171'
                }}
              >
                {seatsLeft} of {event.totalSeats} Available
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '20px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase'
                }}
              >
                Ticket Price
              </span>
              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#34d399',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                ₹{event.price}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleBookSeats}
              disabled={seatsLeft === 0}
            >
              <span>{seatsLeft === 0 ? 'Sold Out' : 'Book Seats'}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
