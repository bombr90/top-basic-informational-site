const http = require("http");
const fs = require("fs");

// const host = "127.0.0.1";
const host = "0.0.0.0";
const port = 8080;

const httpHandler = (request, response) => {
  if(request.url === '/' || request.url === '/index') {
    fs.readFile('./public/index.html', 'utf8',(err,data) => {
      if(err===null){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
        return;
      } 
    })
  } else if(request.url === '/favicon.ico') {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end();
    return;
  } else if(request.url === '/style.css') {
    fs.readFile("./public/style.css", "utf8", (err, data) => {
      if (err===null) {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(data);
      response.end();
      return;
      }
    });
  } else {
    const url = `./public${request.url}.html`; 
    fs.readFile(url, 'utf8', (err, data) => {
      if(err){
        response.writeHead(404, { "Content-Type": "text/html" });
        fs.readFile('./public/404.html', 'utf8', (err, data) => {
          if (err) {
            response.end("<h1>404 Page Not Found.</h1>")
            return
          };
          response.write(data);
          response.end();
          return
        })
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
        return;
      }
    })
  }
}

const httpServer = http.createServer(httpHandler);
  
httpServer.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});