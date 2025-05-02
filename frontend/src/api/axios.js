import axios from 'axios';

const BACKEND = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default axios.create({
  baseURL: `${BACKEND}/api`,
  withCredentials: true  // if you’re using cookies/auth headers
});
