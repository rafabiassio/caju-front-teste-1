import axios from 'axios';
import environment from '~/utils/environment';

const apiClient = axios.create({
  baseURL: environment.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

export default apiClient;