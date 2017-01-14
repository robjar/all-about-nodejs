const http = require('http');
const url = require('url');
const PORT = 3000;

function webserver(req, res) {
  let baseURI = url.parse(req.url);
  let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
}

http
  .createServer(webserver)
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });