
import axios from 'axios';

const api = axios.create({
  // Ajustando a URL base para incluir o protocolo http://
  baseURL: 'http://localhost:8000/api',
});

export default api;
