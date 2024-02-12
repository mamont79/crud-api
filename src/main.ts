import { ServerResponse, IncomingMessage } from 'http';
import { Worker } from 'worker_threads';
import path from 'path';
import os from 'os';
import { clientsError } from './modules/clientsError';
require('dotenv').config({ path: './.env' });

const workerFile = path.join(__dirname, 'worker.js');
const PORT = Number(process.env.PORT);
const treadsCount = os.availableParallelism() - 1;

const createWorkerThread = (
  request: IncomingMessage,
  response: ServerResponse,
  num: number
) => {
  return new Promise((resolve, reject) => {
    const workerThread = new Worker(workerFile);

    workerThread.postMessage(num);
    workerThread.on('message', (result) => {
      resolve(result);
    });
    workerThread.on('error', (error) => {
      return clientsError(request, response);
    });
  });
};

// const startNum = PORT;
// for (let i = 1; i <= treadsCount; i++) {
//   createWorkerThread(startNum + i);
// }
