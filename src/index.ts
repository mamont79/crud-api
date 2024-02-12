import http from 'http';
import { getUser } from './modules/getUsers';
import { addUser } from './modules/addUser';
import { updateUser } from './modules/updateUser';
import { deleteUser } from './modules/deleteUser';
import { clientsError } from './modules/clientsError';

const PORT = 4000;

const mamontServer = http.createServer((request, response) => {
  if (request.method == 'GET' && request.url == '/api/users') {
    return getUser(request, response);
  } else if (request.method == 'POST' && request.url == '/api/users') {
    return addUser(request, response);
  } else if (request.method == 'PUT' && request.url == '/api/users') {
    return updateUser(request, response);
  } else if (request.method == 'DELETE' && request.url == '/api/users') {
    return deleteUser(request, response);
  } else {
    return clientsError(request, response);
  }
});

mamontServer.listen(4000, () => {
  console.log('Server is running on port 4000. Use http://localhost:4000');
});
