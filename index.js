const http = require('http');
const url = require('url');
const fs = require('fs');

const slugify = require('slugify');

// Here, we are importing the function from our own module
const replaceTemplate = require('./modules/replaceTemplate');

// Here we are reading the data from the dev-data/data.json and sending it as the response to make this api work
// In the path of the file the dot means the directory from which we are running the node command. The root directory will change if we run this directory from anywhere wlse stating the complete path of index.js
// So stating the path like this is not always ideal
// fs.readFile('./dev-data/data.json')

// A better way is to use the variable dirname that will solve the above problem
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Reading the templates
// We are doing this synchronously because we are at the top level and this code is only execited once at the beginning when we load up this application.
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const slugs = dataObj.map(el => slugify(el.productName, {
    lower: true
}))

console.log(slugs);



console.log(slugify('Fresh Avocados', {
    lower: true
}))

// The Server
const server = http.createServer((req,res) => {

    // The parse method of the url module take the first argument as the url of the page and second is true which resembles whether we want to convert the query to the object or not.
    // So. it will return the URL object which contains all the information about the url like path is stored in the pathname var and the parmeter is stored in the query object inside Url object.
    // console.log(url.parse(req.url, true));

    const { query, pathname } = url.parse(req.url, true);

    // Overview Page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })

        // Here we are iterating over each object of the dataObj and create a new array cardHTML, which will have the html of the card but with actual dynamic value, that what the replace template function will do
        // The first map function will return an array with all the card template with the replaced value and then the join method will convert all the elements of the array into a single string
        const cardsHTML = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');

        const output = tempOverview.replace(/{%PRODUCTCARD%}/, cardsHTML);
        
        // Sending the template back
        // res.end(tempOverview);
        res.end(output);
    }

    // Product Page
    else if(pathname === '/product') {

        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        // Defining which product show
        const product = dataObj[query.id];
        const output =  replaceTemplate(tempProduct, product);
        res.end(output);
    }

    // API
    else if(pathname === '/api') {

        // We are sending back directly the data string not the parsed data, so before that we have to set the Content-type
        res.writeHead(200, {
            'Content-type': 'application/json'
        })

        res.end(data);
    }

    // Error Page
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });

        res.end('<h1>Page Not Found!!</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to the port 8000');
})