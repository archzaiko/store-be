import {Request} from 'express';
import {Buffer} from 'buffer';

export function getRequestDataJSON<T>(request: Request): Promise<T> {
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
