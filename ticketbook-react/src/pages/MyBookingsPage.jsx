import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTicketBook } from '../context/TicketBookContext';
import { useToast } from '../context/ToastContext';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { bookings, cancelBooking } = useTicketBook();
  const { showToast } = useToast();

  const [statusFilter, setStatusFilter] = useState('All');
  const [bookingToCancel, setBookingToCancel] = useState(null);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Filter bookings for current user
  const userBookings = bookings.filter(
    (b) => b.userId === currentUser.id || b.userEmail === currentUser.email
  );

  const filteredBookings = userBookings.filter((b) => {
    if (statusFilter === 'All') return true;
    return b.status === statusFilter;
  });

  const handleConfirmCancel = () => {
    if (!bookingToCancel) return;
    const res = cancelBooking(bookingToCancel.id);
    setBookingToCancel(null);

    if (res.success) {
      showToast(res.message, 'success', 'Refund Processed');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>My Bookings & Reservations</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Manage your active reservations, download printable passes, and request instant refunds
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="booking-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button
          type="button"
          className={`booking-tab ${statusFilter === 'All' ? 'active' : ''}`}
          onClick={() => setStatusFilter('All')}
        >
          All Bookings ({userBookings.length})
        </button>
        <button
          type="button"
          className={`booking-tab ${statusFilter === 'Confirmed' ? 'active' : ''}`}
          onClick={() => setStatusFilter('Confirmed')}
        >
          Confirmed ({userBookings.filter((b) => b.status === 'Confirmed').length})
        </button>
        <button
          type="button"
          className={`booking-tab ${statusFilter === 'Cancelled' ? 'active' : ''}`}
          onClick={() => setStatusFilter('Cancelled')}
        >
          Cancelled & Refunded ({userBookings.filter((b) => b.status === 'Cancelled').length})
        </button>
      </div>

      {/* Bookings List */}
      <div id="myBookingsList">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className={`booking-card ${
                b.status === 'Confirmed' ? 'confirmed' : 'cancelled'
              }`}
            >
              <div>
                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                  #{b.id}
                </span>
                <span
                  className={`badge ${
                    b.status === 'Confirmed'
                      ? 'status-confirmed'
                      : 'status-cancelled'
                  }`}
                  style={{ marginLeft: '8px' }}
                >
                  {b.status}
                </span>
                <h3 style={{ margin: '6px 0' }}>{b.eventName}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  📍 {b.mall} • 📅 {b.date} • {b.time}
                </div>
                <div style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                  Seats:{' '}
                  <strong style={{ color: '#34d399' }}>
                    {Array.isArray(b.seats) ? b.seats.join(', ') : b.seats}
                  </strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    marginBottom: '8px'
                  }}
                >
                  ₹{b.totalAmount}
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate(`/ticket/${b.id}`)}
                  >
                    View Ticket
                  </button>
                  {b.status === 'Confirmed' ? (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => setBookingToCancel(b)}
                    >
                      Cancel & Refund
                    </button>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: '#fbbf24',
                        alignSelf: 'center',
                        fontWeight: 600
                      }}
                    >
                      Refunded
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '50px 20px',
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎟️</div>
            <h3>No bookings found</h3>
            <p style={{ marginTop: '6px' }}>
              You don't have any {statusFilter !== 'All' ? statusFilter.toLowerCase() : ''} bookings yet.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/events')}
              style={{ marginTop: '16px' }}
            >
              Browse Shows
            </button>
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {bookingToCancel && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <button
              type="button"
              className="modal-close"
              onClick={() => setBookingToCancel(null)}
            >
              &times;
            </button>
            <div style={{ fontSize: '2rem', color: '#f87171', marginBottom: '8px' }}>
              ⚠️
            </div>
            <h3 style={{ marginBottom: '8px' }}>Cancel Booking?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Are you sure you want to cancel booking{' '}
              <strong style={{ color: '#fff' }}>#{bookingToCancel.id}</strong> for{' '}
              <em>{bookingToCancel.eventName}</em>?
            </p>
            <div
              style={{
                background: 'rgba(10,13,20,0.6)',
                padding: '12px',
                borderRadius: '8px',
                margin: '16px 0',
                fontSize: '0.85rem'
              }}
            >
              • Seats{' '}
              <strong style={{ color: '#34d399' }}>
                {Array.isArray(bookingToCancel.seats)
                  ? bookingToCancel.seats.join(', ')
                  : bookingToCancel.seats}
              </strong>{' '}
              will be released back to availability.
              <br />• Simulated refund of{' '}
              <strong style={{ color: '#34d399' }}>
                ₹{bookingToCancel.totalAmount}
              </strong>{' '}
              will be credited instantly.
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={() => setBookingToCancel(null)}
              >
                Keep Booking
              </button>
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel & Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
