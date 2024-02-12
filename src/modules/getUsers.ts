import fs from 'fs';
import path from 'path';
import { ServerResponse, IncomingMessage } from 'http';

const getUser = (request: IncomingMessage, response: ServerResponse) => {
  return fs.readFile(
    path.join(__dirname, '..', 'database.json'),
    'utf8',
    (err, data) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(
          JSON.stringify({
            success: false,
            error: 'Something wrong on server',
          })
        );
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(
          JSON.stringify({
            success: true,
            message: JSON.parse(data),
          })
        );
      }
    }
  );
};

export { getUser };
