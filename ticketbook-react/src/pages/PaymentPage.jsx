import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTicketBook } from '../context/TicketBookContext';
import { useToast } from '../context/ToastContext';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    selectedEvent,
    selectedSeats,
    addBooking,
    clearSelectedSeats
  } = useTicketBook();
  const { showToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState(
    currentUser ? `${currentUser.email.split('@')[0]}@okhdfcbank` : 'user@okhdfcbank'
  );
  const [activeUpiPill, setActiveUpiPill] = useState('Google Pay');

  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'Rahul Sharma');
  const [selectedWallet, setSelectedWallet] = useState('Paytm Wallet');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!selectedEvent || selectedSeats.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>No seats selected</h2>
        <p style={{ color: 'var(--text-muted)', margin: '12px 0 20px' }}>
          Please select your seats before proceeding to payment.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/events')}
        >
          Browse Shows
        </button>
      </div>
    );
  }

  const count = selectedSeats.length;
  const subtotal = selectedEvent.price * count;
  const convenienceFee = count * 20;
  const total = subtotal + convenienceFee;

  const handleUpiPillClick = (provider, suffix) => {
    setActiveUpiPill(provider);
    const base = currentUser ? currentUser.email.split('@')[0] : 'user';
    setUpiId(`${base}${suffix}`);
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.substring(0, 2)}/${raw.substring(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        showToast('Please enter a valid UPI ID (e.g. name@bank)', 'error');
        return;
      }
    } else if (paymentMethod === 'card') {
      const cleanNum = cardNumber.replace(/\s+/g, '');
      if (cleanNum.length < 16) {
        showToast('Please enter a valid 16-digit card number', 'error');
        return;
      }
      if (!cardExpiry || !cardExpiry.includes('/') || cardExpiry.length < 5) {
        showToast('Please enter expiry in MM/YY format', 'error');
        return;
      }
      if (cardCvv.length < 3) {
        showToast('Please enter a valid 3-digit CVV', 'error');
        return;
      }
    }

    setIsProcessing(true);
    setIsSuccess(false);

    // Stage 1: Authorization simulation (1.8s)
    setTimeout(() => {
      setIsSuccess(true);

      const bookingId = 'TB-' + Math.floor(100000 + Math.random() * 900000);
      const newBooking = {
        id: bookingId,
        userId: currentUser ? currentUser.id : 'guest',
        userName: currentUser ? currentUser.name : 'Patron',
        userEmail: currentUser ? currentUser.email : 'patron@example.com',
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        mall: selectedEvent.mall,
        venue: selectedEvent.venue,
        date: selectedEvent.date,
        time: selectedEvent.time,
        seats: [...selectedSeats],
        ticketCount: count,
        ticketPrice: selectedEvent.price,
        convenienceFee: convenienceFee,
        totalAmount: total,
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      addBooking(newBooking);
      clearSelectedSeats();

      // Stage 2: Success redirect (1.2s)
      setTimeout(() => {
        setIsProcessing(false);
        navigate(`/ticket/${bookingId}`);
      }, 1200);
    }, 1800);
  };

  return (
    <div>
      <div className="payment-grid">
        <div className="payment-main-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}
          >
            <div>
              <h2>Secure Checkout</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Select payment method
              </p>
            </div>
            <span className="badge status-confirmed">🔒 256-Bit SSL Demo</span>
          </div>

          <div className="method-tabs">
            <button
              type="button"
              className={`method-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              ⚡ Instant UPI
            </button>
            <button
              type="button"
              className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              💳 Card
            </button>
            <button
              type="button"
              className={`method-tab ${paymentMethod === 'wallet' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('wallet')}
            >
              👛 Wallet
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* UPI Panel */}
            {paymentMethod === 'upi' && (
              <div>
                <div className="quick-options">
                  <span
                    className={`quick-option-pill ${activeUpiPill === 'Google Pay' ? 'active' : ''}`}
                    onClick={() => handleUpiPillClick('Google Pay', '@okhdfcbank')}
                  >
                    Google Pay
                  </span>
                  <span
                    className={`quick-option-pill ${activeUpiPill === 'PhonePe' ? 'active' : ''}`}
                    onClick={() => handleUpiPillClick('PhonePe', '@ybl')}
                  >
                    PhonePe
                  </span>
                  <span
                    className={`quick-option-pill ${activeUpiPill === 'Paytm' ? 'active' : ''}`}
                    onClick={() => handleUpiPillClick('Paytm', '@paytm')}
                  >
                    Paytm
                  </span>
                </div>
                <div className="form-group">
                  <label>UPI ID (VPA)</label>
                  <input
                    type="text"
                    className="form-control no-icon"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="name@okhdfcbank"
                    required
                  />
                </div>
              </div>
            )}

            {/* Card Panel */}
            {paymentMethod === 'card' && (
              <div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    className="form-control no-icon"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Name on card"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    className="form-control no-icon"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4532 8901 2345 6789"
                    maxLength={19}
                    required
                  />
                </div>
                <div className="card-row">
                  <div className="form-group">
                    <label>MM/YY</label>
                    <input
                      type="text"
                      className="form-control no-icon"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="12/28"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      className="form-control no-icon"
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))
                      }
                      placeholder="321"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Wallet Panel */}
            {paymentMethod === 'wallet' && (
              <div>
                <div className="form-group">
                  <label>Select Wallet</label>
                  <select
                    className="form-control"
                    value={selectedWallet}
                    onChange={(e) => setSelectedWallet(e.target.value)}
                  >
                    <option value="Paytm Wallet">Paytm Wallet</option>
                    <option value="PhonePe Wallet">PhonePe Wallet</option>
                    <option value="Amazon Pay">Amazon Pay</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              style={{ marginTop: '14px' }}
            >
              <span>Pay Now</span>
              <span>₹{total}</span>
            </button>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-sub)',
                textAlign: 'center',
                marginTop: '10px'
              }}
            >
              ⚠️ Demo project simulation. No real money charged.
            </p>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="order-summary-card">
          <h3 style={{ marginBottom: '16px' }}>Booking Summary</h3>
          <div style={{ marginBottom: '14px' }}>
            <h4>{selectedEvent.name}</h4>
            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}
            >
              {selectedEvent.mall} • {selectedEvent.date}, {selectedEvent.time}
            </div>
            <div
              className="seat-tag"
              style={{ marginTop: '8px', display: 'inline-block' }}
            >
              Seats: {selectedSeats.join(', ')}
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--border-light)',
              padding: '14px 0'
            }}
          >
            <div className="price-row">
              <span>Tickets ({count}):</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="price-row">
              <span>Convenience Fee:</span>
              <span>₹{convenienceFee}</span>
            </div>
            <div className="price-row total-row">
              <span>Total Payable:</span>
              <span style={{ color: '#34d399' }}>₹{total}</span>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ✓ 100% Refund upon cancellation
            <br />✓ Instant digital m-ticket
          </div>
        </aside>
      </div>

      {/* Payment Processing Modal */}
      {isProcessing && (
        <div className="modal-overlay active">
          <div className="modal-content" style={{ textAlign: 'center' }}>
            {!isSuccess ? (
              <div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    border: '4px solid rgba(255,42,95,0.2)',
                    borderTopColor: 'var(--primary)',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    animation: 'spin 0.8s linear infinite'
                  }}
                ></div>
                <h3>Authorizing Payment</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Connecting to bank authorization gateway...
                </p>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    fontSize: '2.5rem',
                    color: '#10b981',
                    marginBottom: '8px'
                  }}
                >
                  ✓
                </div>
                <h3 style={{ color: '#34d399' }}>Payment Successful!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Generating your digital ticket pass...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
