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

function webserver(req, res) {
  let baseURI = url.parse(req.url);
  let filepath = __dirname + publicFolder + (baseURI.pathname === '/' ? '/index.html' : baseURI.pathname);
  
  debug(__dirname, baseURI.pathname, filepath);

  fs.access(filepath, fs.F_OK, (err) => {
    if (!err) {
      fs.readFile(filepath, (err, content) => {
        let contentType = getMIMEType(path.extname(filepath));

        res.writeHead(200, {'Content-type': contentType});
        res.end(content, 'utf-8');
      });
    } else {
      res.writeHead(404);
      res.end('The resouse not found');
    }
  });
}

http
  .createServer(webserver)
  .listen(PORT, () => {
    debug(`Server running on port ${PORT}`);
  });