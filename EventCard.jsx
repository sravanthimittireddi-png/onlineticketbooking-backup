import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTicketBook } from '../context/TicketBookContext';
import { getFallbackImage } from '../utils/fallbackImage';

export default function EventCard({ event, showMallName = false }) {
  const navigate = useNavigate();
  const { selectEvent, getBookedSeatsForEvent } = useTicketBook();

  const bookedCount = getBookedSeatsForEvent(event.id).length;
  const seatsLeft = Math.max(0, event.totalSeats - bookedCount);

  const handleDetails = () => {
    selectEvent(event);
    navigate(`/events/${event.id}`);
  };

  const handleBookNow = () => {
    selectEvent(event);
    navigate(`/seats/${event.id}`);
  };

  return (
    <div className="event-card">
      <div className="event-card-img-wrap">
        <img
          src={event.image}
          alt={event.name}
          className="event-card-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getFallbackImage(event.name, event.category);
          }}
        />
        <div className="event-badge-overlay">
          <span className="badge badge-movie">{event.category}</span>
        </div>
        <div className="event-price-overlay">₹{event.price}</div>
      </div>
      <div className="event-card-body">
        <h3 className="event-card-title">{event.name}</h3>
        <div className="event-card-meta">
          <div>📅 {event.date} • {event.time}</div>
          <div>
            📍 {showMallName ? `${event.mall} • ` : ''}{event.venue}
          </div>
          <div style={{ color: seatsLeft > 5 ? '#34d399' : '#f87171', fontWeight: 700 }}>
            🎟️ {seatsLeft} seats left
          </div>
        </div>
        <div className="event-card-footer">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleDetails}
          >
            Details
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
