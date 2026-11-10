export const STORAGE_KEYS = {
  USERS: 'ticketbook_users',
  CURRENT_USER: 'ticketbook_currentUser',
  MALLS: 'ticketbook_malls',
  EVENTS: 'ticketbook_events',
  BOOKINGS: 'ticketbook_bookings',
  SELECTED_MALL: 'ticketbook_selectedMall',
  SELECTED_EVENT: 'ticketbook_selectedEvent',
  SELECTED_SEATS: 'ticketbook_selectedSeats',
  LATEST_BOOKING_ID: 'ticketbook_latestBookingId'
};

export const DEFAULT_MALLS = [
  { id: 'mall-1', name: 'PVR INOX Mall', location: 'Phoenix Marketcity, Whitefield', city: 'Bengaluru', screens: 8, experience: '4K Laser Atmos & IMAX', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&auto=format&fit=crop&q=80', rating: 4.8 },
  { id: 'mall-2', name: 'City Center Mall', location: 'MG Road, Downtown Promenade', city: 'Bengaluru', screens: 6, experience: 'IMAX 3D & Dine-in Lounges', image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?w=800&auto=format&fit=crop&q=80', rating: 4.7 },
  { id: 'mall-3', name: 'Trend Mall', location: 'Nexus Boulevard, Outer Ring', city: 'Bengaluru', screens: 5, experience: 'Cinépolis VIP & Dolby 7.1', image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&auto=format&fit=crop&q=80', rating: 4.6 },
  { id: 'mall-4', name: 'Central Plaza', location: 'Park Street, Connaught Square', city: 'Bengaluru', screens: 7, experience: 'Gold Class Recliners', image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&auto=format&fit=crop&q=80', rating: 4.9 },
  { id: 'mall-5', name: 'Grand Galaxy Mall', location: 'Cyber City, High-Tech Corridor', city: 'Bengaluru', screens: 10, experience: 'ScreenX 270° & 4DX', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80', rating: 4.8 },
  { id: 'mall-6', name: 'Metro Square', location: 'Central Transit Hub & Junction', city: 'Bengaluru', screens: 6, experience: 'Dolby Cinema', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&auto=format&fit=crop&q=80', rating: 4.5 }
];

export const DEFAULT_USERS = [
  { id: 'admin_1', name: 'System Admin', email: 'admin@ticketbook.com', phone: '+91 9876543210', password: 'admin123', role: 'admin', createdAt: '2026-10-01' },
  { id: 'user_1', name: 'Rahul Sharma', email: 'user@ticketbook.com', phone: '+91 9123456780', password: 'user123', role: 'user', createdAt: '2026-10-02' },
  { id: 'user_2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 9888877777', password: 'password123', role: 'user', createdAt: '2026-10-03' }
];

export const DEFAULT_EVENTS = [
  { id: 'evt-101', name: 'Avengers: Secret Wars', category: 'Movies', description: 'Earth’s mightiest heroes unite across infinite timelines in the most anticipated cinematic showdown.', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=80', date: '2026-10-15', time: '07:00 PM', venue: 'Audi 1 (IMAX 3D Laser)', mall: 'PVR INOX Mall', duration: '180 mins', language: 'English / Hindi', price: 250, totalSeats: 40, featured: true },
  { id: 'evt-102', name: 'Arijit Singh Symphony Night', category: 'Music', description: 'Soulful Bollywood melodies and romantic anthems accompanied by a 45-piece live orchestra.', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80', date: '2026-10-22', time: '06:30 PM', venue: 'Open Air Grand Arena', mall: 'Central Plaza', duration: '150 mins', language: 'Hindi', price: 750, totalSeats: 40, featured: true },
  { id: 'evt-103', name: 'Zakir Khan - Live Special', category: 'Comedy', description: 'Hilarious storytelling, observational comedy, and signature punchlines with India’s beloved comedian.', image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&auto=format&fit=crop&q=80', date: '2026-10-16', time: '07:30 PM', venue: 'Club Comedy Lounge', mall: 'City Center Mall', duration: '90 mins', language: 'Hindi', price: 499, totalSeats: 40, featured: true },
  { id: 'evt-104', name: 'IPL 2026 Grand Screen Arena', category: 'Sports', description: 'Electric stadium energy, giant 4K displays, and live cheering with fellow cricket enthusiasts.', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80', date: '2026-10-17', time: '07:30 PM', venue: 'Sports Bar 4K Arena', mall: 'PVR INOX Mall', duration: '210 mins', language: 'English / Hindi', price: 200, totalSeats: 40, featured: false },
  { id: 'evt-105', name: 'Interstellar (10th Anniv. IMAX)', category: 'Movies', description: 'Christopher Nolan’s epic sci-fi adventure returns in stunning 70mm remastered IMAX.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80', date: '2026-10-18', time: '08:30 PM', venue: 'Audi 3 (Dolby Atmos)', mall: 'City Center Mall', duration: '169 mins', language: 'English', price: 280, totalSeats: 40, featured: true },
  { id: 'evt-106', name: 'Coldplay Tribute - Viva La Vida', category: 'Music', description: 'A dazzling tribute concert featuring laser shows, wristbands, and timeless Coldplay anthems.', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80', date: '2026-10-25', time: '08:00 PM', venue: 'Grand Concert Hall', mall: 'Trend Mall', duration: '120 mins', language: 'English', price: 500, totalSeats: 40, featured: false },
  { id: 'evt-107', name: 'Bassi: Kisi Ko Batana Mat', category: 'Comedy', description: 'Anubhav Singh Bassi narrates new, never-heard hostel, college, and courtroom escapades.', image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&auto=format&fit=crop&q=80', date: '2026-10-21', time: '08:00 PM', venue: 'Main Auditorium', mall: 'Metro Square', duration: '100 mins', language: 'Hindi', price: 450, totalSeats: 40, featured: false },
  { id: 'evt-108', name: 'Mughal-E-Azam: Grand Musical', category: 'Theatre', description: 'Broadway-style stage adaptation with lavish palace sets, live singing, and Kathak choreography.', image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop&q=80', date: '2026-10-26', time: '06:00 PM', venue: 'Heritage Royal Stage', mall: 'Central Plaza', duration: '140 mins', language: 'Hindi / Urdu', price: 600, totalSeats: 40, featured: true }
];

export const DEFAULT_BOOKINGS = [
  { id: 'TB-789012', userId: 'user_1', userName: 'Rahul Sharma', userEmail: 'user@ticketbook.com', eventId: 'evt-101', eventName: 'Avengers: Secret Wars', mall: 'PVR INOX Mall', venue: 'Audi 1 (IMAX 3D Laser)', date: '2026-10-15', time: '07:00 PM', seats: ['A1', 'A2'], ticketCount: 2, ticketPrice: 250, convenienceFee: 40, totalAmount: 540, paymentMethod: 'Instant UPI', status: 'Confirmed', createdAt: '2026-10-04T14:30:00' },
  { id: 'TB-654321', userId: 'user_2', userName: 'Priya Patel', userEmail: 'priya@example.com', eventId: 'evt-101', eventName: 'Avengers: Secret Wars', mall: 'PVR INOX Mall', venue: 'Audi 1 (IMAX 3D Laser)', date: '2026-10-15', time: '07:00 PM', seats: ['C3', 'C4', 'C5'], ticketCount: 3, ticketPrice: 250, convenienceFee: 60, totalAmount: 810, paymentMethod: 'Card', status: 'Confirmed', createdAt: '2026-10-05T10:15:00' },
  { id: 'TB-998877', userId: 'user_1', userName: 'Rahul Sharma', userEmail: 'user@ticketbook.com', eventId: 'evt-102', eventName: 'Arijit Singh Symphony Night', mall: 'Central Plaza', venue: 'Open Air Grand Arena', date: '2026-10-22', time: '06:30 PM', seats: ['B4', 'B5'], ticketCount: 2, ticketPrice: 750, convenienceFee: 50, totalAmount: 1550, paymentMethod: 'Instant UPI', status: 'Confirmed', createdAt: '2026-10-05T16:45:00' }
];

export function getStoredItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

export function setStoredItem(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage:`, e);
  }
}
