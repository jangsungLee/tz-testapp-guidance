import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../confluence-build/preview');
const port = Number(process.env.CONFLUENCE_PREVIEW_PORT || 4173);
const mime = {'.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8'};

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost:' + port).pathname);
    let target = path.resolve(root, '.' + pathname);
    if (!target.startsWith(root)) throw new Error('Invalid path');
    const info = await stat(target);
    if (info.isDirectory()) target = path.join(target, 'index.html');
    response.writeHead(200, {'Content-Type': mime[path.extname(target)] || 'application/octet-stream'});
    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    response.end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log('Confluence preview: http://127.0.0.1:' + port);
});
