import http from 'http';
import { getUser } from './modules/getUsers';
import { addUser } from './modules/addUser';
import { updateUser } from './modules/updateUser';
import { deleteUser } from './modules/deleteUser';
import { clientsError } from './modules/clientsError';
import { getUserById } from './modules/getUserById';
require('dotenv').config({ path: './.env' });

const URL_REG_EXP =
  /\/api\/users\/[0-9a-zA-Z!"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~]+$/;

const PORT = Number(process.env.PORT);

const mamontServer = http.createServer((request, response) => {
  if (
    request.method == 'GET' &&
    (request.url == '/api/users' || request.url == '/api/users/')
  ) {
    return getUser(request, response);
  } else if (
    request.method === 'GET' &&
    request.url &&
    request.url.match(URL_REG_EXP)
  ) {
    const id = request.url.split('/')[3];
    if (!isNaN(Number(id))) {
      return getUserById(request, response, Number(id));
    } else {
      return clientsError(request, response);
    }
  } else if (
    request.method == 'POST' &&
    (request.url == '/api/users' || request.url == '/api/users/')
  ) {
    return addUser(request, response);
  } else if (
    request.method == 'PUT' &&
    (request.url == '/api/users' || request.url == '/api/users/')
  ) {
    return updateUser(request, response);
  } else if (
    request.method == 'DELETE' &&
    (request.url == '/api/users' || request.url == '/api/users/')
  ) {
    return deleteUser(request, response);
  } else {
    return clientsError(request, response);
  }
});

mamontServer.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Use http://localhost:${PORT}`
  );
});
