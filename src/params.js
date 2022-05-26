const dotenv = require('dotenv');

// Load ENV File from Config Directory
try {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config(`${__dirname}/../../.env`);
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(`Error: ${error}`);
}

function processEnv(env) {
  let result = env;
  if (!Number.isNaN(Number(result))) result = Number(result);
  if (result === 'true') result = true;
  if (result === 'false') result = false;
  if (result === 'null') result = null;
  return result;
}

const port = processEnv(process.env.PORT) || 3000;

const signature = process.env.SIGNATURE || 'supersecret123';
const filename = process.env.FILENAME || 'output/data.csv';
const headers = process.env.HEADERS || 'system,serial,software,rating,destination,duration,duration_fmt,cause,issue,feedback,reporter';

const appName = processEnv(process.env.APP_NAME) || 'csv-server';
const lokiEnabled = processEnv(process.env.LOKI_ENABLED) || false;
const lokiHost = processEnv(process.env.LOKI_HOST) || 'http://loki:3100';
const consoleLevel = process.env.CONSOLE_LEVEL || 'info';

module.exports = {
  port,
  signature,
  filename,
  headers,
  lokiEnabled,
  lokiHost,
  appName,
  consoleLevel,
};
