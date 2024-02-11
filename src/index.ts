import http from 'http';
import { getUser } from './modules/getUsers';
import { addUser } from './modules/addUser';
import { updateUser } from './modules/updateUser';

const PORT = 4000;

const mamontServer = http.createServer((request, response) => {
  if (request.method == 'GET' && request.url == '/api/users') {
    return getUser(request, response);
  } else if (request.method == 'POST' && request.url == '/api/users') {
    return addUser(request, response);
  } else if (request.method == 'PUT' && request.url == '/api/users') {
    return updateUser(request, response);
  }
});

mamontServer.listen(4000, () => {
  console.log('Server is running on port 4000. Use http://localhost:4000');
});
