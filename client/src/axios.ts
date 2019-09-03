import axios from 'axios';

// might be overkill for now since CRA's probably going to end up building a static bundle
const urlPath = process.env.NODE_ENV === 'production' ? `https://wj-todolet.herokuapp.com/api`
  :`http://localhost:5000/api`;

const instance = axios.create({
  baseURL: urlPath,
  withCredentials: process.env.NODE_ENV === 'production' ? true : undefined,
  // Necessary so the thing doesn't throw on >400 error
  validateStatus: () => true
});

export default instance;