import axios from 'axios';

// NOTE It's a repeat of the var in <rootdir>/config/config.ts
const PORT = process.env.PORT || 5000 || 8000;

const ApiUri = process.env.NODE_ENV === 'production' ? 'https://wj-todolet.herokuapp.com/'
: `http://localhost:${ PORT }`;


const instance = axios.create({
  baseURL: ApiUri,
  withCredentials: true,
  // Necessary so the thing doesn't throw on >400 error
  validateStatus: () => true
});

instance.defaults.withCredentials = true

export default instance;