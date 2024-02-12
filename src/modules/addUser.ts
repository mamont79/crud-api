import fs from 'fs';
import path from 'path';
import { ServerResponse, IncomingMessage } from 'http';

import { User } from './userInterface';

const addUser = (request: IncomingMessage, response: ServerResponse) => {
  let data: string = '';

  request.on('data', (chunk) => {
    data += chunk.toString();
  });

  request.on('end', () => {
    let user = JSON.parse(data);

    if (!('username' in user) || !('age' in user) || !('hobbies' in user)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({
          seccess: false,
          error: "You don't fill all required fields",
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
            let latest_id = users.reduce(
              (max = 0, task: User) => (task.id > max ? task.id : max),
              0
            );
            user.id = latest_id + 1;
            users.push(user);

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
                      seccess: false,
                      error: 'Something wrong on server',
                    })
                  );
                } else {
                  response.writeHead(201, {
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
      );
    }
  });
};

export { addUser };
