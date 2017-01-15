'use strict';

const http = require('http');
const url = require('url');
const qs = require('querystring');

let routes = {
  'GET': {
    '/': (req, res) => {
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end('<h1>Hello router</h1>');
    }
  },
  'POST': {
    '/api/login': (req, res) => {
      let body = '';
      
      req.on('data', (data) => {
        body += data;
        if (body.length > 2097152) {
          console.log('too big!!!');
          res.writeHead(413, {'Content-type': 'text/html'});
          res.end('<h2>The file being uploaded exceedes the 2 MB limit</h2>');
          // req.connection.destroy(); // TODO: further investigation required
        }
      });

      req.on('end', () => {
        console.log(body.length);
        let params = qs.parse(body);
        res.end(params['a'] + ' / ' + params['b']);
      });
    }
  },
  'NA': (req, res) => {
    res.writeHead(404);
    res.end('Content not found');
  }
};

function router(req, res) {
  let baseURI = url.parse(req.url, true);
  let resolveRoute = routes[req.method][baseURI.pathname];
  
  if (resolveRoute) {
    resolveRoute(req, res);
  } else {
    routes['NA'](req, res);
  }
}

http
  .createServer(router)
  .listen(3000, () => {
    console.log('Server is running on port 3000');
  });