const fs = require('fs')

const requestHandler = (req,res) => {
   // console.log(req);
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<header><title>My First Page</title></header>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit" >Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, () => {
                res.statusCode = 302
                res.setHeader('Location','/')
                return res.end()
            });
        })
    }
    res.setHeader('content-type', 'text/html')
    res.write('<html>')
    res.write('<header><title>My First Page</title></header>')
    res.write('<body><h1>Hello from my Node.js Server</h1></body>')
    res.write('<html/>')
    // process.exit();
}

// module.exports = requestHandler

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// }

// module.exports.handler = requestHandler
// module.exports.someText = 'Some test'

exports.handler = requestHandler
exports.someText = 'Some test hello2'