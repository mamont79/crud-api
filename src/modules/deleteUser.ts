import fs from 'fs';
import path from 'path';
import { ServerResponse, IncomingMessage } from 'http';

import { User } from './userInterface';

const deleteUser = (request: IncomingMessage, response: ServerResponse) => {
  let data: string = '';
  request.on('data', (chunk) => {
    data += chunk.toString();
  });

  request.on('end', () => {
    let user: User = JSON.parse(data);

    if (!('id' in user)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({
          seccess: false,
          error: "We need user's id to delete it",
        })
      );
    } else if (typeof user.id !== 'number') {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({
          seccess: false,
          error: "User's id must be a number",
        })
      );
    } else {
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
            let index = null;
            let indexOf = users.findIndex((userDel) => userDel.id == user.id);

            if (indexOf >= 0) {
              index = indexOf;
            }

            if (!index) {
              response.writeHead(404, { 'Content-Type': 'application/json' });
              response.end(
                JSON.stringify({
                  seccess: false,
                  error: "User's with this id doesn't exist",
                })
              );
            } else {
              users.splice(index, 1);
              fs.writeFile(
                path.join(__dirname, '..', 'database.json'),
                JSON.stringify(users),
                (err) => {
                  if (err) {
                    response.writeHead(500, {
                      'Content-Type': 'application/json',
                    });
                    response.end(
                      JSON.stringify({
                        success: false,
                        error: 'Something wrong on server',
                      })
                    );
                  } else {
                    response.writeHead(204, {
                      'Content-Type': 'application/json',
                    });
                    response.end(
                      JSON.stringify({
                        success: true,
                        message: users,
                      })
                    );
                  }
                }
              );
            }
          }
        }
      );
    }
  });
};

export { deleteUser };
