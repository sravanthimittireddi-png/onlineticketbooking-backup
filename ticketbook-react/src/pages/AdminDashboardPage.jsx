import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTicketBook } from '../context/TicketBookContext';
import { useToast } from '../context/ToastContext';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { users } = useAuth();
  const {
    malls,
    events,
    bookings,
    addEvent,
    updateEvent,
    deleteEvent
  } = useTicketBook();
  const { showToast } = useToast();

  const [editId, setEditId] = useState('');
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Movies');
  const [formMall, setFormMall] = useState(
    malls.length > 0 ? malls[0].name : 'PVR INOX Mall'
  );
  const [formVenue, setFormVenue] = useState('Audi 1');
  const [formPrice, setFormPrice] = useState(250);
  const [formDate, setFormDate] = useState('2026-10-20');
  const [formTime, setFormTime] = useState('07:00 PM');
  const [formDuration, setFormDuration] = useState('120 mins');
  const [formDesc, setFormDesc] = useState('');

  // Calculate live stats
  const totalUsers = users.length;
  const totalEvents = events.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'Confirmed')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const resetForm = () => {
    setEditId('');
    setFormName('');
    setFormCategory('Movies');
    setFormMall(malls.length > 0 ? malls[0].name : 'PVR INOX Mall');
    setFormVenue('Audi 1');
    setFormPrice(250);
    setFormDate('2026-10-20');
    setFormTime('07:00 PM');
    setFormDuration('120 mins');
    setFormDesc('');
  };

  const handleEditClick = (e) => {
    setEditId(e.id);
    setFormName(e.name);
    setFormCategory(e.category);
    setFormMall(e.mall);
    setFormVenue(e.venue);
    setFormPrice(e.price);
    setFormDate(e.date);
    setFormTime(e.time);
    setFormDuration(e.duration || '120 mins');
    setFormDesc(e.description || '');

    const formEl = document.getElementById('admin-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteClick = (id, name) => {
    if (window.confirm(`Are you sure you want to delete event "${name}"?`)) {
      deleteEvent(id);
      if (editId === id) resetForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formVenue.trim() || !formDate || !formTime.trim()) {
      showToast('Please fill all required fields', 'warning');
      return;
    }

    const payload = {
      name: formName,
      category: formCategory,
      mall: formMall,
      venue: formVenue,
      price: formPrice,
      date: formDate,
      time: formTime,
      duration: formDuration,
      description: formDesc
    };

    if (editId) {
      updateEvent(editId, payload);
    } else {
      addEvent(payload);
    }

    resetForm();
  };

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
          <h1>Admin Control Panel</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Live metrics, show scheduling and booking management
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/mall')}
        >
          Preview Patron Site
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-users">👥</div>
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                color: 'var(--text-sub)',
                fontWeight: 700
              }}
            >
              Total Users
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800 }}>
              {totalUsers}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-events">🎬</div>
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                color: 'var(--text-sub)',
                fontWeight: 700
              }}
            >
              Total Events
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800 }}>
              {totalEvents}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-bookings">🎟️</div>
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                color: 'var(--text-sub)',
                fontWeight: 700
              }}
            >
              Total Bookings
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800 }}>
              {totalBookings}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-revenue">💰</div>
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                color: 'var(--text-sub)',
                fontWeight: 700
              }}
            >
              Total Revenue
            </div>
            <div
              style={{
                fontSize: '1.7rem',
                fontWeight: 800,
                color: '#34d399'
              }}
            >
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Event Form */}
      <div className="admin-card" id="admin-form" style={{ marginTop: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <h3>{editId ? `Edit Event: ${formName}` : 'Add New Event'}</h3>
          {editId && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px'
            }}
          >
            <div className="form-group">
              <label>Event Name *</label>
              <input
                type="text"
                className="form-control no-icon"
                placeholder="Show title"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                className="form-control"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              >
                <option value="Movies">Movies</option>
                <option value="Music">Music</option>
                <option value="Comedy">Comedy</option>
                <option value="Sports">Sports</option>
                <option value="Theatre">Theatre</option>
              </select>
            </div>

            <div className="form-group">
              <label>Host Mall *</label>
              <select
                className="form-control"
                value={formMall}
                onChange={(e) => setFormMall(e.target.value)}
              >
                {malls.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Venue / Screen *</label>
              <input
                type="text"
                className="form-control no-icon"
                placeholder="Audi 1"
                value={formVenue}
                onChange={(e) => setFormVenue(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Ticket Price (₹) *</label>
              <input
                type="number"
                className="form-control no-icon"
                placeholder="250"
                value={formPrice}
                onChange={(e) => setFormPrice(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                className="form-control no-icon"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Time *</label>
              <input
                type="text"
                className="form-control no-icon"
                placeholder="07:00 PM"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Duration *</label>
              <input
                type="text"
                className="form-control no-icon"
                placeholder="150 mins"
                value={formDuration}
                onChange={(e) => setFormDuration(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '14px' }}>
            <label>Description *</label>
            <textarea
              className="form-control no-icon"
              rows={2}
              placeholder="Show description"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '6px' }}>
            {editId ? 'Update Event ✓' : 'Save & Publish Event ✓'}
          </button>
        </form>
      </div>

      {/* Events List Table */}
      <div className="admin-card" style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '14px' }}>Scheduled Shows & Events</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Category</th>
                <th>Mall</th>
                <th>Schedule</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td>
                    <strong>{e.name}</strong>
                  </td>
                  <td>
                    <span className="badge badge-movie">{e.category}</span>
                  </td>
                  <td>{e.mall}</td>
                  <td>
                    {e.date} • {e.time}
                  </td>
                  <td>₹{e.price}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEditClick(e)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteClick(e.id, e.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Bookings Table */}
      <div className="admin-card" style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '14px' }}>All Customer Bookings</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Patron</th>
                <th>Event</th>
                <th>Seats</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <code>#{b.id}</code>
                  </td>
                  <td>{b.userName}</td>
                  <td>{b.eventName}</td>
                  <td>
                    {Array.isArray(b.seats) ? b.seats.join(', ') : b.seats}
                  </td>
                  <td>₹{b.totalAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        b.status === 'Confirmed'
                          ? 'status-confirmed'
                          : 'status-cancelled'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registered Users Table */}
      <div className="admin-card" style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '14px' }}>Registered Users</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <code>{u.id}</code>
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-tag ${u.role}`}>{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
