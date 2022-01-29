const http = require('http');
const Auth = require('./auth');

const SERVER_PORT = 3000;

const ALLOW_ORIGINS = ['http://localhost:4200'];
const ALLOW_METHODS = ['GET', 'POST', 'PATCH'];
const ALLOW_HEADERS = ['content-type'];

const server = http.createServer( (request, response) => {

    // request properties
    const requestMethod = request.method;
    const requestOrigin = request.headers['origin'];

    // CORS
    if ( ALLOW_ORIGINS.includes(requestOrigin) ) {
        response.setHeader('access-control-allow-origin', requestOrigin);
    }

    if (requestMethod === "OPTIONS") {
        // request access control headers
        const accessControlRequestMethod = request.headers["access-control-request-method"];
        // const accessControlRequestHeaders = request.headers["access-control-request-headers"];

        if ( ALLOW_METHODS.includes(accessControlRequestMethod) ) {
            response.setHeader('access-control-allow-methods', accessControlRequestMethod);
        }

        response.setHeader('access-control-allow-headers', ALLOW_HEADERS.join(', '));

        response.end();

        return;
    }

    routeRequest(request, response);
} );

server.listen(SERVER_PORT);


// UTILS

function routeRequest (request, response) {
    switch (request.url) {
        case '/auth/login':
            processLoginRequest(request, response);
            break;
        default:
            response.statusCode = 404;
            response.end( JSON.stringify( { message: 'resource not found' } ) );
    }
}

async function processLoginRequest (request, response) {

    const data = await getRequestDataJSON(request);

    let username = data.username;
    let password = data.password;

    let responseData = {};

    try {
        const auth = new Auth();
        const authorized = auth.login(username, password);
        response.statusCode = 200;
        responseData = {
            message: 'success',
            data: authorized
        };
    } catch (error) {
        response.statusCode = error.statusCode;
        responseData = {
            message: error.message,
            data: false
        };
    }

    response.end( JSON.stringify(responseData) );
}

function getRequestDataJSON (request) {
    return new Promise( (resolve, reject) => {
        const chunks = [];

        request.on('data', (chunk) => {
            chunks.push(chunk);
        });

        request.on('end', () => {
            const dataBuffer = Buffer.concat(chunks);
            const data = JSON.parse(dataBuffer);
            resolve(data);
        });

        request.on('error', (error) => {
            reject(error);
        });
    } );
}
