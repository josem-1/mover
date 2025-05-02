import axios from 'axios';


export default axios.create({
  //baseURL: process.env.REACT_APP_API_BASE + '/api',       // CRA proxy will forward to localhost:5000
  withCredentials: true, // send cookies if/when you add auth
});
