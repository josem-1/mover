import axios from 'axios';

export default axios.create({
  baseURL: '/api',       // CRA proxy will forward to localhost:5000
  withCredentials: true, // send cookies if/when you add auth
});
