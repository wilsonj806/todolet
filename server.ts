import 'dotenv/config';
import {
  dbName, PORT,
} from './config/config';
import { app, mongoose } from './expressApp';


import Todos from './models/todo';


/* eslint-disable no-console */

const db = mongoose.connection;

/**
 * ANCHOR Check database connection
 * =============================================================
 *
 */
db.once('open', async (): Promise<any> => {
  try {
    // TODO figure out how to add error checking for this Node event
    const result: mongoose.Document | null = await Todos.findOne();
    console.log(`Connection to MongoDB database: ${dbName} confirmed`);
  } catch (error) {
    console.log('Error alert, check below for additional logging \n', error);
    throw new Error(error.message);
  }
});

app.listen(PORT, (): any => { console.log(`Server started on port ${PORT}`); });

/* eslint-enable no-console */

export {};
