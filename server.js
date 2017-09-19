const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  req.setEncoding('utf8');
  console.log(req.url);
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<img src="/cat.png" width="275" height="275">`);
  } else if (/.(png|jpg|gif)/.test(req.url)) {
    res.writeHead(200, { 'Content-Type': 'image/*' });
    const stream = fs.createReadStream('./cat.png');
    stream.pipe(res);
    stream
      .on('end', () => {
        res.end();
      })
      .on('error', err => {
        console.log(err);
        process.exit(1);
      });
  }
});

server.listen(3000, err => {
  console.log('server starting');
});
