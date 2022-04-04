import {IncomingMessage, ServerResponse} from 'http';
import {Buffer} from 'buffer';

import {AuthModule} from 'src/auth';

interface LoginRequestBody {
  username: string;
  password: string;
}

interface ApiError {
  statusCode: number;
  message: string;
}

export function routeRequest(
  request: IncomingMessage,
  response: ServerResponse
) {
  switch (request.url) {
    case '/auth/login':
      processLoginRequest(request, response);
      break;
    default:
      response.statusCode = 404;
      response.end(JSON.stringify({message: 'resource not found'}));
  }
}

export async function processLoginRequest(
  request: IncomingMessage,
  response: ServerResponse
) {
  const data = await getRequestDataJSON(request);

  const username = data.username;
  const password = data.password;

  let responseData = {};

  try {
    const auth = new AuthModule();
    const authorized = await auth.login(username, password);
    response.statusCode = 200;
    responseData = {
      message: 'success',
      data: authorized,
    };
  } catch (error) {
    responseData = getApiErrorResponse(error as ApiError);
  }

  response.end(JSON.stringify(responseData));
}

export function getRequestDataJSON(
  request: IncomingMessage
): Promise<LoginRequestBody> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    request.on('data', chunk => {
      chunks.push(chunk);
    });

    request.on('end', () => {
      const dataBuffer = Buffer.concat(chunks).toString();
      const data = JSON.parse(dataBuffer);
      resolve(data);
    });

    request.on('error', error => {
      reject(error);
    });
  });
}

function getApiErrorResponse(error: ApiError): ApiResponse {
  return new ApiResponse({
    status: error.statusCode,
    message: error.message,
  });
}

export class ApiResponse {
  status!: number;
  message?: string;

  constructor({status, message}: ApiResponse) {
    this.status = status;
    this.message = message;
  }
}
