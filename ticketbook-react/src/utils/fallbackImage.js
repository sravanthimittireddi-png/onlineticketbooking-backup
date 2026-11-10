export function getFallbackImage(title = 'TicketBook', category = 'Event') {
  try {
    const bgColors = {
      'Movies': '#e11d48',
      'Music': '#6366f1',
      'Comedy': '#d97706',
      'Sports': '#059669',
      'Theatre': '#9333ea',
      'Events': '#0891b2',
      'Mall': '#1e293b'
    };
    const safeTitle = String(title || 'TicketBook').replace(/"/g, '&quot;');
    const bg = bgColors[category] || '#334155';
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg}" />
            <stop offset="100%" stop-color="#0a0d14" />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#g)" />
        <circle cx="300" cy="160" r="45" fill="rgba(255,255,255,0.15)" />
        <text x="300" y="172" font-family="Arial" font-size="32" fill="#fff" text-anchor="middle">🎟️</text>
        <text x="300" y="240" font-family="Arial" font-size="24" fill="#fff" font-weight="bold" text-anchor="middle">${safeTitle}</text>
        <text x="300" y="275" font-family="Arial" font-size="16" fill="rgba(255,255,255,0.7)" text-anchor="middle">TicketBook Experience • ${category}</text>
      </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  } catch (e) {
    return '';
  }
}
