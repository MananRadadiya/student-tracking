// Frontend configuration

const config = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  UPLOADS_URL: import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000/uploads',
};

export default config;
