
const mongoose = require('mongoose');
require('dotenv').config();
const http = require('http');

/**
 * HANDLING UNCAUGHT EXCEPTION ERRORS
 * Process.traceDeprecation = true;
 */
process.on('uncaughtException', (err) => {
  console.log(
    `UNCAUGHT EXCEPTION! Server Shutting down...\n
    ${err.name} \n ${err.message} \n ${err.stack}`
  );
  process.exit(1);
});

const PORT = process.env.PORT;
let MONGOOSE_DB_URL = process.env.ATLAS_URI;

mongoose
  .connect(MONGOOSE_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const app = require('./app.js');
    const server = http.createServer(app);

    /** Stops request after => 2min */
    server.timeout = 60 * 60 * 1000;
    server.listen(PORT, () =>
      console.log(`Server running on port: ${PORT}, DB: connected`)
    );
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit(1);
  });

process.on('SIGINT', () => process.exit(1));
