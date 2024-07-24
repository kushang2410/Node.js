const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res) => {

    switch(req.url) {
        case '/':
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    res.end("404 Not Found");
                    return;
                }
                res.write(data);
                res.end();
            });
            break;
        default:
            res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
