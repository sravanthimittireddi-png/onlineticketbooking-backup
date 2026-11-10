import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTicketBook } from '../context/TicketBookContext';
import { useToast } from '../context/ToastContext';

export default function SeatSelectionPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { getEventById, getBookedSeatsForEvent, setSelectedSeats, selectEvent } = useTicketBook();
  const { showToast } = useToast();

  const event = getEventById(eventId);
  const [localSelectedSeats, setLocalSelectedSeats] = useState([]);

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
          Browse Shows
        </button>
      </div>
    );
  }

  const bookedSeats = getBookedSeatsForEvent(event.id);
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 8;

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    setLocalSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((s) => s !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const handleProceed = () => {
    if (localSelectedSeats.length === 0) {
      showToast('Please select at least one seat', 'warning');
      return;
    }
    selectEvent(event);
    setSelectedSeats(localSelectedSeats);
    navigate('/checkout');
  };

  const totalPrice = localSelectedSeats.length * event.price;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div>
          <h1>{event.name}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {event.mall} • {event.venue} • {event.date}, {event.time}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/events')}
        >
          Change Show
        </button>
      </div>

      <div className="cinema-hall-container">
        {/* Screen / Stage */}
        <div className="screen-wrapper">
          <div className="screen-curve"></div>
          <div
            style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'var(--text-sub)'
            }}
          >
            Screen / Stage This Way
          </div>
        </div>

        {/* Legend */}
        <div className="seats-legend">
          <div>
            <span className="legend-sample legend-available"></span> Available
          </div>
          <div>
            <span className="legend-sample legend-selected"></span> Selected
          </div>
          <div>
            <span className="legend-sample legend-booked"></span> Booked
          </div>
        </div>

        {/* Seats Matrix */}
        <div className="seats-matrix">
          {rows.map((rowLetter) => (
            <div key={rowLetter} className="seat-row">
              <div className="row-letter">{rowLetter}</div>
              <div className="row-seats">
                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const seatId = `${rowLetter}${i + 1}`;
                  const isBooked = bookedSeats.includes(seatId);
                  const isSelected = localSelectedSeats.includes(seatId);

                  let seatClass = 'seat';
                  if (isBooked) seatClass += ' booked';
                  else if (isSelected) seatClass += ' selected';
                  else seatClass += ' available';

                  return (
                    <div
                      key={seatId}
                      className={seatClass}
                      onClick={() => handleSeatClick(seatId)}
                      title={
                        isBooked
                          ? 'Already Booked'
                          : isSelected
                          ? `Deselect Seat ${seatId}`
                          : `Select Seat ${seatId} (₹${event.price})`
                      }
                      style={{ cursor: isBooked ? 'not-allowed' : 'pointer' }}
                    >
                      {seatId}
                    </div>
                  );
                })}
              </div>
              <div className="row-letter">{rowLetter}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Bottom Bar */}
      <div className="seats-checkout-bar">
        <div>
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            Selected Seats
          </div>
          <div
            style={{
              display: 'flex',
              gap: '6px',
              marginTop: '4px',
              flexWrap: 'wrap'
            }}
          >
            {localSelectedSeats.length === 0 ? (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                None selected
              </span>
            ) : (
              localSelectedSeats.map((s) => (
                <span key={s} className="seat-tag">
                  {s}
                </span>
              ))
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}
            >
              Ticket Price
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              ₹{event.price}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}
            >
              Total
            </div>
            <div
              style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#34d399',
                fontFamily: 'var(--font-heading)'
              }}
            >
              ₹{totalPrice}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleProceed}
            disabled={localSelectedSeats.length === 0}
          >
            <span>Proceed to Payment →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
