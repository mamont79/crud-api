import fs from 'fs';
import path from 'path';
import { ServerResponse, IncomingMessage } from 'http';

import { User } from './userInterface';

const deleteUser = (request: IncomingMessage, responce: ServerResponse) => {
  let data: string = '';
  request.on('data', (chunk) => {
    data += chunk.toString();
  });
  request.on('end', () => {
    let user: User = JSON.parse(data);
    fs.readFile(
      path.join(__dirname, '..', 'database.json'),
      'utf8',
      (err, data) => {
        if (err) {
          responce.writeHead(500, { 'Content-Type': 'application/json' });
          responce.end(
            JSON.stringify({
              success: false,
              error: err,
            })
          );
        } else {
          let users: Array<User> = JSON.parse(data);
          let index = users.findIndex((userDel) => userDel.id == user.id);
          users.splice(index, 1);

          fs.writeFile(
            path.join(__dirname, '..', 'database.json'),
            JSON.stringify(users),
            (err) => {
              if (err) {
                responce.writeHead(500, { 'Content-Type': 'application/json' });
                responce.end(
                  JSON.stringify({
                    success: false,
                    error: err,
                  })
                );
              } else {
                responce.writeHead(200, { 'Content-Type': 'application/json' });
                responce.end(
                  JSON.stringify({
                    success: true,
                    message: user,
                  })
                );
              }
            }
          );
        }
      }
    );
  });
};

export { deleteUser };
