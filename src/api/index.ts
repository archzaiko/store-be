import {createServer} from 'http';

import {
  SERVER_PORT,
  ALLOW_ORIGINS,
  ALLOW_METHODS,
  ALLOW_HEADERS,
} from './constants';

import {routeRequest} from './utils';

const server = createServer((request, response) => {
  // request properties
  const requestMethod = request.method;
  const requestOrigin = request.headers['origin'];

  // CORS
  if (requestOrigin && ALLOW_ORIGINS.includes(requestOrigin)) {
    response.setHeader('access-control-allow-origin', requestOrigin);
  }

  if (requestMethod === 'OPTIONS') {
    // request access control headers
    const accessControlRequestMethod =
      request.headers['access-control-request-method'];
    // const accessControlRequestHeaders = request.headers["access-control-request-headers"];

    if (
      accessControlRequestMethod &&
      ALLOW_METHODS.includes(accessControlRequestMethod)
    ) {
      response.setHeader(
        'access-control-allow-methods',
        accessControlRequestMethod
      );
    }

    response.setHeader(
      'access-control-allow-headers',
      ALLOW_HEADERS.join(', ')
    );

    response.end();

    return;
  }

  routeRequest(request, response);
});

// server.listen(SERVER_PORT);

const listen = () => server.listen(SERVER_PORT);

export {listen};
