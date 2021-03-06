const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const debug = require('debug')('webserver');
const PORT = process.env.PORT || 8080;
const publicFolder = '/public';

function getMIMEType(extension) {
  switch(extension) {
    case '.htm':
    case '.html':
      return 'text/html';
    case '.css': 
      return 'text/css';
    case '.js':
      return 'text/javascript'
    case '.gif':
      return 'image/gif'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.png':
      return 'image/png'
    default:
      return 'text/plain';
  }
}

function fileAccess(filepath) {
  return new Promise((resolve, reject) => {
    fs.access(filepath, fs.F_OK, (error) => {
      if (!error) {
        resolve(filepath);
      } else {
        reject(error);
      }
    });
  });
}

function streamFile(filepath) {
  return new Promise((resolve, reject) => {
    let fileStream = fs.createReadStream(filepath);

    fileStream.on('open', () => {
      resolve(fileStream);
    });

    fileStream.on('error', (error) => {
      reject(error);
    });
  });
}

function webserver(req, res) {
  let baseURI = url.parse(req.url);
  let filepath = __dirname + publicFolder + (baseURI.pathname === '/' ? '/index.html' : baseURI.pathname);
  let contentType = getMIMEType(path.extname(filepath));

  debug(__dirname, baseURI.pathname, filepath);

  fileAccess(filepath)
    .then(streamFile)
    .then((fileStream) => {
      res.writeHead(200, {'Content-type': contentType});
      fileStream.pipe(res);
    })
    .catch((error) => {
      res.writeHead(404, {'Content-type': 'text/plain'});
      res.end('The resource was not found.');
    });
}

http
  .createServer(webserver)
  .listen(PORT, () => {
    debug(`Server running on port ${PORT}`);
  });