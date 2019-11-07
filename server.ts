import 'dotenv/config';
import {
  dbName, PORT,
} from './config/config';
import { app } from './expressApp';


/* eslint-disable no-console */


/**
 * ANCHOR Check database connection
 * =============================================================
 *
 */


app.listen(PORT, (): any => { console.log(`Server started on port ${PORT}`); });

/* eslint-enable no-console */

export {};
