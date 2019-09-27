import axios from 'axios';

// might be overkill for now since CRA's probably going to end up building a static bundle
const urlPath = process.env.REACT_APP_ENV === 'production' ? `https://wj-todolet.herokuapp.com/api`
  :`http://localhost:5000/api`;

const instance = axios.create({
  baseURL: urlPath,
  withCredentials: true,
  // Necessary so the thing doesn't throw on >400 error
  validateStatus: () => true
});

instance.defaults.withCredentials = true

export default instance;