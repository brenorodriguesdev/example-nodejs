const http = require('http');

const port = 3000;
const host = '127.0.0.1';

var items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
]


const getItems = (_, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(items));
}

const routes =
{
    GET: {
        '/items': getItems
    }
}
const server = http.createServer((request, response) => {
    const { method, url } = request;
    const endpoint = routes[method] && routes[method][url]
    if (endpoint) {
        console.log(endpoint)
        return endpoint(request, response)
    }

    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not found');
});

server.listen(port, host, () => {
    console.log(`Listening on http://localhost:${port} ...`);
});