const fs = require('fs');
const http = require('http');
const url = require('url');

//READ/WRITE FILES
///////////////////////////
//Blocking, synchronous way

// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);
// const textOutput = `This is a text about avocado: ${textInput}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOutput);

//Non-blocking, asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });
//////////////////////////

//SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.end('OVERVIEW URL');
    } else if(pathName === '/product') {
        res.end('PRODUCT URL');
    } else if (pathName === '/api') {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(data);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html'});
        res.end('<h1>PAGE NOT FOUND</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is listening on port 8000');
});