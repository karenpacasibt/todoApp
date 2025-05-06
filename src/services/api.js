import axios from 'axios';

const api = axios.create({
  baseURL: 'http://proyecto-todolist.test/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
