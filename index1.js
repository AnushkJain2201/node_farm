// // The fs module will return an object, in which there are lots of functions that we can use.
// const fs = require('fs');

// // readFileSync() is the fucntion we use for reading the file, this function take two arguments, first is the file of the path that we want to read and second is the character encoding.
// const text = fs.readFileSync('./txt/input.txt', 'utf-8');

// // This will print all the content in the file on the console.
// console.log(text);

// const textOut = `This is the text that will be written through Node.js: ${text} \nCreated on ${Date.now()}`;

// // This method will write the textOut in the argumented file path. It also create the file if it is not already been created.
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File was written");

// // Asynchronus call of readFile() for reading a file
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });

// console.log("WIll read file");

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             // While using the asynchronus write function, the callback function only has one argument that is err as we don't have any data returning by the function.
//             fs.writeFile('./txt/final.txt', `${data2 + " " + data3}`, 'utf-8', err => {
//                 console.log("Your file has been written");
//             })
//         })
//     });
// });

// console.log("WIll read file");

const http = require('http');
const url = require('url');

// This method will accept a callback function which will be fired off each time a new request hits our server and this call back function has access two very important and fundamental variables, it is the request variable and the response variable.
// Whenver, any request will hit our server, this callback fuction will get triggered, which contains two objects req and res and the req object which hold all kind of stuff like the request url, and a bunch of other stuff. On the other hand this res object gives us a lot of tools basically for dealing with the response, so for sending out the response.
const server = http.createServer((req, res) => {

    // On printing the url, we get two url means that this callback function is called twice once is the simple / and other is the /favicon.ico , it is the request that browser automatically performs for the website's favicon
    // console.log(req.url);

    // Implemeting Routing
    // If we send a request to a route that we didn't specify then the loading wheel keep on spinning, unless we create an else option
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.end("This is the OVERVIEW");
    }
    else if(pathName === '/product') {
        res.end("This is the PRODUCT");
    } else {

        // The writehead method will send the status code of 404 with the response. Also we can use this writeHead method to send headers as the second argument in an object.
        // The header must be specified before sending the response
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page Not Found !!!</h1>');
    }

    // The simplest way to send the response is this end method. It is a way to send a very very simple response.
    // res.end('Hello from the server!');
})

// Creating server is the first part, the second part is actually listem to incoming requests from the client.
// For this we will use the listen function of the server which take two arguments, first is the port and second one is the host in this case it is the localhost and third is the optional argument which is a callback function which will run when the server actually start listening. The listen function will start listening to the incoming requset basically starting the server
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to the port 8000')
});