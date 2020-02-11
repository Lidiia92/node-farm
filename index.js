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

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%EMOJI%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%NUTRITIENTS%}/g, product.nutrients);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    return output;
}

// ** readFileSunc called only once in the beginning of executing index.js file **
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const dataObj = JSON.parse(data);

// **this function is called everytime there's a new request **
const server = http.createServer((req, res) => {
    const pathName = req.url;

    //OVERVIEW PAGE
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    //PRODUCT PAGE
    } else if(pathName === '/product') {
        res.end('PRODUCT URL');

    // API PAGE
    } else if (pathName === '/api') {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(data);
    }

    // NOT FOUND
    else {
        res.writeHead(404, { 'Content-Type': 'text/html'});
        res.end('<h1>PAGE NOT FOUND</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is listening on port 8000');
});