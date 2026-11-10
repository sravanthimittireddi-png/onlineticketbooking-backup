import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTicketBook } from '../context/TicketBookContext';

export default function DigitalTicketPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getBookingById, bookings } = useTicketBook();

  const booking =
    getBookingById(bookingId) ||
    (bookings.length > 0 ? bookings[0] : null);

  if (!booking) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Ticket not found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '12px 0 20px' }}>
          We could not locate this booking pass.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/my-bookings')}
        >
          View My Bookings
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          className="badge status-confirmed"
          style={{
            padding: '6px 16px',
            fontSize: '0.88rem',
            marginBottom: '8px',
            display: 'inline-block'
          }}
        >
          ✓ Booking Confirmed
        </div>
        <h1>Your Digital Experience Ticket</h1>
      </div>

      <div className="ticket-card" id="printTicketCard">
        <div className="ticket-top-band">
          <div className="brand-logo" style={{ fontSize: '1.2rem' }}>
            <div
              className="brand-icon"
              style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}
            >
              🎟️
            </div>
            <div className="brand-name">
              Ticket<span>Book</span>
            </div>
          </div>
          <code
            style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '3px 8px',
              borderRadius: '4px'
            }}
          >
            {booking.id}
          </code>
        </div>

        <div className="ticket-body">
          <h2 style={{ fontSize: '1.7rem', marginBottom: '4px' }}>
            {booking.eventName}
          </h2>
          <div
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              marginBottom: '16px'
            }}
          >
            {booking.mall} • {booking.venue}
          </div>

          <div className="ticket-grid-details">
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-sub)'
                }}
              >
                Date
              </span>
              <div style={{ fontWeight: 700 }}>{booking.date}</div>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-sub)'
                }}
              >
                Time
              </span>
              <div style={{ fontWeight: 700 }}>{booking.time}</div>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-sub)'
                }}
              >
                Seats
              </span>
              <div style={{ fontWeight: 700, color: '#34d399' }}>
                {Array.isArray(booking.seats)
                  ? booking.seats.join(', ')
                  : booking.seats}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-sub)'
                }}
              >
                Tickets
              </span>
              <div style={{ fontWeight: 700 }}>
                {booking.ticketCount} Tickets
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-sub)'
                }}
              >
                Patron Name
              </span>
              <div style={{ fontWeight: 700 }}>{booking.userName}</div>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-sub)'
                }}
              >
                Amount Paid
              </span>
              <div style={{ fontWeight: 700, color: '#34d399' }}>
                ₹{booking.totalAmount}
              </div>
            </div>
          </div>

          <div className="ticket-perforation"></div>

          <div style={{ textAlign: 'center' }}>
            <div className="barcode-visual"></div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                color: 'var(--text-sub)'
              }}
            >
              *{booking.id}-AUTH*
            </div>
            <div
              style={{
                color: booking.status === 'Confirmed' ? '#34d399' : '#f87171',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginTop: '4px'
              }}
            >
              {booking.status} ✓
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '24px',
          flexWrap: 'wrap'
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePrint}
        >
          📥 Download / Print Ticket
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/my-bookings')}
        >
          View My Bookings
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/mall')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
