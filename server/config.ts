import session, { SessionOptions } from 'express-session';
import connect from 'connect-pg-simple';
import { CorsOptions } from 'cors';

const {
  NODE_ENV: NodeENV, SESSION_SECRET,
} = process.env;

const uri: any = process.env.DB_URI

const dbName: any = process.env.DB_NAME

const PORT = process.env.PORT || 5000 || 8000;

const pgStore = connect(session);
const store = new pgStore(
  {
    conString: uri,
    tableName: 'mySession',
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

const whitelist = NodeENV === 'production' ? ['https://wj-todolet.herokuapp.com'] : ['http://localhost:3000', 'http://localhost:5000']

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

const ApiUri = process.env.NODE_ENV === 'production' ? 'https://wj-todoloet.herokuapp.com/'
  : `http://localhost:${ PORT }`;

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
