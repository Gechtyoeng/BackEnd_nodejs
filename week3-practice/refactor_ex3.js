const http = require('express');
const fs = require('fs');
const server = http();

const port = 3000;

const logger = (res, req, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
}

server.use(logger);

server.get('/', (req, res) => {
    res.send(`welcome to the home page`);
});

server.get('/contact', (req, res) => {
    res.send(`
         <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
        </form>
    `);
});

server.post('/contact', (req, res) => {
    // implement post request
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const parsedData = new URLSearchParams(body);
        const name = parsedData.get('name');
        console.log('Submison:', name);
        const submission = `Name: ${name}\n`;
        fs.appendFile('submissions.txt', submission, err => {
            if (err) {
                console.error('Failed to write to file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server error');
                return;
            }
            // send response
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>submit successful, ${name}!</h1>`);
        });
    })
});
    server.use((req, res) => {
        res.status(404).send('404 Not Found');
    });
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
