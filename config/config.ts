import session, { SessionOptions } from 'express-session';
import connect from 'connect-mongodb-session';
import { ENV } from '../types';
import { CorsOptions } from 'cors';

const {
  NODE_ENV: NodeENV, DBNAME, DBNAME_LOCAL, SESSION_SECRET,
} = process.env;

const uri: any = (NodeENV === 'production')
  ? process.env.MONGODB_URI
  : process.env.MONGODB_URI_LOCAL;

const dbName: any = (NodeENV === 'production')
  ? DBNAME
  : DBNAME_LOCAL;

const PORT = process.env.PORT || 5000 || 8000;

const MongoDbStore = connect(session);
const store = new MongoDbStore(
  {
    uri,
    databaseName: dbName,
    collection: 'mySession',
  },
  (error): any => {
    if (error) console.error(error);
  },
);

store.on('error', (error): any => console.error(error));
const day: number = 1000 * 60 * 60 * 24;

const sessConfig: SessionOptions = {
  secret: SESSION_SECRET || '',
  store,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: day,
    secure: false,
  },
};

const whitelist = NodeENV === 'production' ? ['http://localhost:3000', 'https://wj-todolet.herokuapp.com'] : ['http://localhost:3000', 'http://localhost:5000']

const corsOptions: CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  allowedHeaders: ['Content-Type'],
  credentials: true
};

const ApiUri = process.env.NODE_ENV === 'production' ? 'https://wj-anothertodo.herokuapp.com/'
: `http://localhost:${process.env.PORT}`;

export {
  ApiUri,
  uri,
  dbName,
  PORT,
  session,
  sessConfig,
  corsOptions,
  NodeENV
};
