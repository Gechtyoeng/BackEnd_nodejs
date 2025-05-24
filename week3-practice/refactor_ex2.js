const http = require('express');
const server = http();

const port = 3000;

const logger = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
}

server.use(logger);

server.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to the Home Page</h1>
                <p>This is a simple Node.js server.</p>
            </body>
        </html>
    `);
});

server.get('/about', (req, res) => {
    res.send(`
        <html>
            <head><title>About</title></head>
            <body>
                <h1>About Us</h1>
                <p>At CADT, we love node.js! </p>
            </body>
        </html>
    `);
});

server.get('/contact-us', (req, res) => {
    res.send(`
        <html>
            <head><title>Contact Us</title></head>
            <body>
                <h1>Contact Us</h1>
                <p>You can research us via email</p>
            </body>
        </html>
    `);
});
server.get('/products', (req, res) => {
    res.send(`
        <html>
            <head><title>Product</title></head>
            <body>
                <h1>Product</h1>
                <p>Buy one get one... </p>
            </body>
        </html>
    `);
});
server.get('/projects', (req, res) => {
    res.send(`
        <html>
            <head><title>Projects</title></head>
            <body>
                <h1>Projects</h1>
                <p>Here are our awsome project!</p>
            </body>
        </html>
    `);
});
server.use((req, res) => {
    res.status(404).send(`
        <html>
            <head><title>404 Not Found</title></head>
            <body>
                <h1>404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </body>
        </html>
    `);
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});