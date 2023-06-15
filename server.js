const http = require('http');
 
const requestListener = (request, response) => {
    let body = [];
    
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
 
    const { method } = request;
    
    if(method === 'GET') {
        response.end('<h1>Hello!</h1>');
    }

    if(method === 'POST') {
        
        request.on('data', (chunk) => {
            body.push(chunk);
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            response.end(`<h1>Hai ${body}!</h1>`);
        });
    }

    
};
 
 
const server = http.createServer(requestListener);

const port = 9000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});