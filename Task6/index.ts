import * as http from 'node:http';

const PORT = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse)=>{
    const pathName = req.url;

    if (pathName === '/') {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end('Welcome to the server')
    } else if (pathName === '/about') {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end('This is about route')
    } else {
        res.writeHead(404, {
            'content-type': 'text/html'
        });
        res.end('Page Not Found');
    }
})

server.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})