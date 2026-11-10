import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STORAGE_KEYS,
  DEFAULT_MALLS,
  DEFAULT_EVENTS,
  DEFAULT_BOOKINGS,
  getStoredItem,
  setStoredItem
} from '../utils/storage';
import { getFallbackImage } from '../utils/fallbackImage';
import { useToast } from './ToastContext';

const TicketBookContext = createContext(null);

export function TicketBookProvider({ children }) {
  const { showToast } = useToast();

  // Malls State
  const [malls, setMalls] = useState(() => {
    return getStoredItem(STORAGE_KEYS.MALLS, DEFAULT_MALLS);
  });

  const [selectedMall, setSelectedMallState] = useState(() => {
    const stored = getStoredItem(STORAGE_KEYS.SELECTED_MALL, null);
    if (stored) return stored;
    const initialMalls = getStoredItem(STORAGE_KEYS.MALLS, DEFAULT_MALLS);
    return initialMalls.length > 0 ? initialMalls[0] : null;
  });

  const selectMall = (mall) => {
    setSelectedMallState(mall);
    setStoredItem(STORAGE_KEYS.SELECTED_MALL, mall);
  };

  // Events State
  const [events, setEvents] = useState(() => {
    return getStoredItem(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS);
  });

  const [selectedEvent, setSelectedEventState] = useState(() => {
    return getStoredItem(STORAGE_KEYS.SELECTED_EVENT, null);
  });

  const selectEvent = (event) => {
    setSelectedEventState(event);
    setStoredItem(STORAGE_KEYS.SELECTED_EVENT, event);
  };

  const getEventById = (id) => {
    return events.find(e => e.id === id) || null;
  };

  const addEvent = (eventData) => {
    const newEvent = {
      id: 'evt-' + Date.now(),
      name: eventData.name.trim(),
      category: eventData.category,
      mall: eventData.mall,
      venue: eventData.venue.trim(),
      price: Number(eventData.price) || 250,
      date: eventData.date,
      time: eventData.time.trim(),
      duration: eventData.duration.trim() || '120 mins',
      description: eventData.description.trim(),
      language: eventData.language || 'English / Hindi',
      totalSeats: eventData.totalSeats || 40,
      image: eventData.image || getFallbackImage(eventData.name, eventData.category),
      featured: !!eventData.featured
    };

    const updated = [newEvent, ...events];
    setEvents(updated);
    setStoredItem(STORAGE_KEYS.EVENTS, updated);
    showToast(`Published "${newEvent.name}"`, 'success');
    return newEvent;
  };

  const updateEvent = (id, eventData) => {
    const idx = events.findIndex(e => e.id === id);
    if (idx === -1) return false;

    const updatedEvent = {
      ...events[idx],
      name: eventData.name.trim(),
      category: eventData.category,
      mall: eventData.mall,
      venue: eventData.venue.trim(),
      price: Number(eventData.price) || events[idx].price,
      date: eventData.date,
      time: eventData.time.trim(),
      duration: eventData.duration.trim() || events[idx].duration,
      description: eventData.description.trim()
    };

    const updatedList = [...events];
    updatedList[idx] = updatedEvent;
    setEvents(updatedList);
    setStoredItem(STORAGE_KEYS.EVENTS, updatedList);

    // If currently selected event was updated, sync it
    if (selectedEvent?.id === id) {
      setSelectedEventState(updatedEvent);
      setStoredItem(STORAGE_KEYS.SELECTED_EVENT, updatedEvent);
    }

    showToast(`Updated "${updatedEvent.name}"`, 'success');
    return true;
  };

  const deleteEvent = (id) => {
    const ev = events.find(e => e.id === id);
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    setStoredItem(STORAGE_KEYS.EVENTS, updated);
    if (selectedEvent?.id === id) {
      setSelectedEventState(null);
      try { localStorage.removeItem(STORAGE_KEYS.SELECTED_EVENT); } catch(e) {}
    }
    showToast(ev ? `Deleted "${ev.name}"` : 'Event deleted', 'info');
    return true;
  };

  // Bookings State
  const [bookings, setBookings] = useState(() => {
    return getStoredItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
  });

  const getBookingById = (id) => {
    return bookings.find(b => b.id === id) || null;
  };

  const addBooking = (bookingData) => {
    const updated = [bookingData, ...bookings];
    setBookings(updated);
    setStoredItem(STORAGE_KEYS.BOOKINGS, updated);
    setStoredItem(STORAGE_KEYS.LATEST_BOOKING_ID, bookingData.id);
    return bookingData;
  };

  const cancelBooking = (id) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) {
      return { success: false, message: 'Booking not found' };
    }

    const updated = bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: 'Cancelled',
          refundStatus: 'Refund Processed'
        };
      }
      return b;
    });

    setBookings(updated);
    setStoredItem(STORAGE_KEYS.BOOKINGS, updated);
    return {
      success: true,
      message: `Booking #${id} cancelled. Simulated refund of ₹${booking.totalAmount} processed.`,
      booking
    };
  };

  // Get booked seats for a particular event from confirmed bookings
  const getBookedSeatsForEvent = (eventId) => {
    try {
      const activeBookings = bookings.filter(b => b.eventId === eventId && b.status === 'Confirmed');
      const seats = [];
      activeBookings.forEach(b => {
        if (Array.isArray(b.seats)) {
          seats.push(...b.seats);
        }
      });
      return seats;
    } catch (e) {
      return [];
    }
  };

  // Selected seats during booking flow
  const [selectedSeats, setSelectedSeatsState] = useState(() => {
    return getStoredItem(STORAGE_KEYS.SELECTED_SEATS, []);
  });

  const setSelectedSeats = (seats) => {
    setSelectedSeatsState(seats);
    setStoredItem(STORAGE_KEYS.SELECTED_SEATS, seats);
  };

  const clearSelectedSeats = () => {
    setSelectedSeatsState([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_SEATS);
    } catch (e) {}
  };

  // Seed default data if localStorage was empty
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.MALLS)) {
      setStoredItem(STORAGE_KEYS.MALLS, DEFAULT_MALLS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      setStoredItem(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      setStoredItem(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    }
  }, []);

  const value = {
    malls,
    selectedMall,
    selectMall,
    events,
    selectedEvent,
    selectEvent,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
    bookings,
    getBookingById,
    addBooking,
    cancelBooking,
    getBookedSeatsForEvent,
    selectedSeats,
    setSelectedSeats,
    clearSelectedSeats
  };

  return (
    <TicketBookContext.Provider value={value}>
      {children}
    </TicketBookContext.Provider>
  );
}

export function useTicketBook() {
  const context = useContext(TicketBookContext);
  if (!context) {
    throw new Error('useTicketBook must be used within a TicketBookProvider');
  }
  return context;
}
