import { ApiUri } from './appconfig/config'
import axios from 'axios';

const instance = axios.create({
  baseURL: ApiUri,
  withCredentials: true,
  // Necessary so the thing doesn't throw on >400 error
  validateStatus: () => true
});

instance.defaults.withCredentials = true

export default instance;