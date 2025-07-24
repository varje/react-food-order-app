const isLocalhost = window.location.hostname === 'localhost';

export const API_BASE_URL = isLocalhost
  ? 'http://localhost:5001'
  : 'https://react-food-order-app-production.up.railway.app/api';