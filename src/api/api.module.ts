import * as express from 'express';

import {SERVER_PORT} from './constants';

import {ApiRouter} from './api.controller';

const ApiServer = express();

ApiServer.use(ApiRouter);

const listenApiServer = () =>
  ApiServer.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
  });

export {listenApiServer};
