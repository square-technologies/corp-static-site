// Lambda handler for Next.js standalone server
// This handler will be used with Lambda Function URL

const { Server } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

let serverPromise;

async function getServer() {
  if (!serverPromise) {
    serverPromise = app.prepare().then(() => {
      console.log('Next.js app prepared');
      return app;
    });
  }
  return serverPromise;
}

exports.handler = async (event, context) => {
  try {
    console.log('Lambda invocation started');
    console.log('Event:', JSON.stringify(event, null, 2));

    await getServer();

    // Convert Lambda Function URL event to Node.js request format
    const { requestContext, rawPath, rawQueryString, headers, body, isBase64Encoded } = event;

    // Build the URL
    const url = rawPath + (rawQueryString ? `?${rawQueryString}` : '');
    
    // Convert headers to lowercase (Lambda sends them in mixed case)
    const normalizedHeaders = {};
    Object.keys(headers || {}).forEach(key => {
      normalizedHeaders[key.toLowerCase()] = headers[key];
    });

    // Create a mock request object
    const req = {
      url,
      method: requestContext.http.method,
      headers: normalizedHeaders,
      rawHeaders: [],
      body: body ? (isBase64Encoded ? Buffer.from(body, 'base64') : body) : undefined,
    };

    // Create a mock response object
    let statusCode = 200;
    let responseHeaders = {};
    let responseBody = '';
    let isResponseBase64 = false;

    const res = {
      statusCode: 200,
      headers: {},
      setHeader: (name, value) => {
        responseHeaders[name.toLowerCase()] = value;
      },
      getHeader: (name) => {
        return responseHeaders[name.toLowerCase()];
      },
      writeHead: (code, headers) => {
        statusCode = code;
        if (headers) {
          Object.keys(headers).forEach(key => {
            responseHeaders[key.toLowerCase()] = headers[key];
          });
        }
      },
      write: (chunk) => {
        if (Buffer.isBuffer(chunk)) {
          responseBody += chunk.toString('base64');
          isResponseBase64 = true;
        } else {
          responseBody += chunk;
        }
      },
      end: (chunk) => {
        if (chunk) {
          if (Buffer.isBuffer(chunk)) {
            responseBody += chunk.toString('base64');
            isResponseBase64 = true;
          } else {
            responseBody += chunk;
          }
        }
      },
      finished: false,
    };

    // Handle the request with Next.js
    await handle(req, res);

    // Return Lambda Function URL response format
    return {
      statusCode,
      headers: responseHeaders,
      body: responseBody,
      isBase64Encoded: isResponseBase64,
    };

  } catch (error) {
    console.error('Lambda handler error:', error);
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
      }),
    };
  }
};
