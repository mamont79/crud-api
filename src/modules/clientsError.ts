import { ServerResponse, IncomingMessage } from 'http';

const clientsError = (request: IncomingMessage, responce: ServerResponse) => {
  responce.writeHead(404, { 'Content-Type': 'application/json' });
  responce.end(
    JSON.stringify({
      success: true,
      error: "Can't find this route. Try: '/api/users'",
    })
  );
};

export { clientsError };
