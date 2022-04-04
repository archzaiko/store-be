import {Router} from 'express';

import {AuthRouter} from 'src/auth/auth.module';

import {ALLOW_ORIGINS, ALLOW_HEADERS, ALLOW_METHODS} from './constants';

const ApiRouter = Router();

// CORS
ApiRouter.use((req, res, next) => {
  // request properties
  const requestMethod = req.method;
  const requestOrigin = req.headers['origin'];

  if (requestOrigin && ALLOW_ORIGINS.includes(requestOrigin)) {
    res.setHeader('access-control-allow-origin', requestOrigin);
  }

  if (requestMethod === 'OPTIONS') {
    // request access control headers
    const accessControlRequestMethod =
      req.headers['access-control-request-method'];
    // const accessControlRequestHeaders = request.headers["access-control-request-headers"];

    if (
      accessControlRequestMethod &&
      ALLOW_METHODS.includes(accessControlRequestMethod)
    ) {
      res.setHeader('access-control-allow-methods', accessControlRequestMethod);
    }

    res.setHeader('access-control-allow-headers', ALLOW_HEADERS.join(', '));
  }

  next();
});

ApiRouter.use('/auth', AuthRouter);

export {ApiRouter};
