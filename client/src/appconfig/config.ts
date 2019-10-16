import { PORT } from '../../../config/config';
const ApiUri = process.env.NODE_ENV === 'production' ? 'https://wj-anothertodo.herokuapp.com/'
: `http://localhost:${ PORT || 5000 }`;

export { ApiUri };