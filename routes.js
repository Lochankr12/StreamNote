// routes.js

const fs = require('fs');

const handler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><form action="/message" method="POST">');
    res.write('<input type="text" name="message" required>');
    res.write('<button type="submit">Send</button>');
    res.write('</form></body></html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.writeHead(302, { Location: '/' });
        return res.end();
      });
    });
  }
};

module.exports = handler;
