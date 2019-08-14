import axios from 'axios';

// might be overkill for now since CRA's probably going to end up building a static bundle
const urlPath = process.env.NODE_ENV === 'production' ? `https://wj-todolet.herokuapp.com/api`
  :`http://localhost:${ process.env.PORT }/api`;

const instance = axios.create({
  baseURL: urlPath
});

export default instance;