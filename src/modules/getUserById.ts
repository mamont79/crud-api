import fs from 'fs';
import path from 'path';
import { ServerResponse, IncomingMessage } from 'http';

import { User } from './userInterface';

const getUserById = (
  request: IncomingMessage,
  response: ServerResponse,
  ind: number
) => {
  fs.readFile(
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
        let users: Array<User> = JSON.parse(data);
        let currentId = null;
        let indexOf = users.findIndex((userGet) => userGet.id == ind);

        if (indexOf >= 0) {
          currentId = indexOf;
        }

        if (!currentId && currentId !== 0) {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.end(
            JSON.stringify({
              seccess: false,
              error: "User's with this id doesn't exist",
            })
          );
        } else {
          const user = users[currentId];
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(
            JSON.stringify({
              success: true,
              message: user,
            })
          );
        }
      }
    }
  );
};

export { getUserById };
