import session, { SessionOptions } from 'express-session';
import connect from 'connect-mongodb-session';
import { ENV } from '../types';

const {
  NODE_ENV: NodeENV, DBNAME, DBNAME_LOCAL, SESSION_SECRET,
}: ENV = process.env;

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
  secret: SESSION_SECRET,
  store,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: day,
    secure: false,
  },
};

export {
  uri,
  dbName,
  PORT,
  session,
  sessConfig,
};
