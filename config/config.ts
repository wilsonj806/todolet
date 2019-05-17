import { NODE_ENV, ENV } from '../types';
import session, { SessionOptions } from 'express-session';
import connect from 'connect-mongodb-session';

const { NODE_ENV, DBNAME, DBNAME_LOCAL, SESSION_SECRET }: ENV = process.env;

const uri: any = (NODE_ENV === 'production')
  ? process.env.MONGODB_URI
  : process.env.MONGODB_URI_LOCAL;

const dbName: any = (NODE_ENV === 'production')
  ? DBNAME
  : DBNAME_LOCAL;

const PORT = process.env.PORT || 5000 || 8000;

const MongoDbStore = connect(session);
const store = new MongoDbStore(
  {
    uri: uri,
    databaseName: dbName,
    collection: 'mySession'
  },
  (error) => {
    if (error) console.log(error);
  }
);

store.on('error', (error) => console.log(error));
const day: number = 1000 * 60 * 60 * 24;

const sessConfig: SessionOptions = {
  secret: SESSION_SECRET,
  store: store,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: day,
    secure: false
  }
}

export {
  uri,
  dbName,
  PORT,
  session,
  sessConfig
};