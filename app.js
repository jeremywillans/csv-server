//
// Copyright (c) 2022 Jeremy Willans
// Licensed under the MIT License
//
const express = require('express');
const fs = require('fs');
const Writer = require('csv-write-stream');
const logger = require('./src/logger')('entrypoint');

const app = express();

// Import Integration Options
const params = require('./src/params');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('trust proxy', 1);

// Define Output File
let filePath;
if (process.env.NODE_ENV === 'production') {
  filePath = `${__dirname}/../${params.filename}`;
} else {
  filePath = `${__dirname}/${params.filename}`;
}

app.post('/', (req, res) => {
  logger.debug(`Received POST Message from ${req.ip}`);
  // Check Post Contains Data
  if (!req.body) {
    logger.error(`No Body Data from ${req.ip}`);
    res.sendStatus(404);
    return;
  }
  // Check Signature
  if (req.headers.authorization !== params.signature) {
    logger.error(`Invalid Signature from ${req.ip}`);
    res.sendStatus(403);
    return;
  }

  let writer;
  const headers = params.headers.split(',');
  if (!fs.existsSync(filePath)) {
    writer = Writer({ headers });
  } else {
    writer = Writer({ sendHeaders: false });
  }

  writer.pipe(fs.createWriteStream(filePath, { flags: 'a' }));
  writer.write(req.body);

  logger.debug('Saved to CSV!');

  // Return OK
  res.sendStatus(200);
});

let server;
// Init Function
async function init() {
  // Starts the App
  server = app.listen(params.port, () => {
    logger.info(`App listening on port ${params.port}`);
  });
}

// Initiate
init();

// Handle Shutdowns
['SIGINT', 'SIGTERM', 'SIGQUIT']
  .forEach((signal) => process.on(signal, () => {
    logger.info('Stopping...');
    server.close(() => {
      logger.info('Server Closed.');
      process.exit();
    });
  }));
