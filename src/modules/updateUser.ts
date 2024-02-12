import fs from 'fs';
import path from 'path';
import { ServerResponse, IncomingMessage } from 'http';

import { User } from './userInterface';

const updateUser = (request: IncomingMessage, response: ServerResponse) => {
  let data: string = '';
  request.on('data', (chunk) => {
    data += chunk.toString();
  });

  request.on('end', () => {
    let user: User = JSON.parse(data);

    if (
      !('username' in user) ||
      !('age' in user) ||
      !('hobbies' in user) ||
      !('username' in user)
    ) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({
          seccess: false,
          error: "You don't fill all required fields",
        })
      );
    } else if (!('id' in user)) {
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
            let indexOf = users.findIndex((userUpd) => userUpd.id == user.id);

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
              users[index] = user;
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
                    response.writeHead(200, {
                      'Content-Type': 'application/json',
                    });
                    response.end(
                      JSON.stringify({
                        success: true,
                        users: users,
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

export { updateUser };
