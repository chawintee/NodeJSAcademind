const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {
    // console.log(req);
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<header><title>My First Page</title></header>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit" name="message">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    // if (url === '/message' && method === 'POST'){
    //     fs.writeFileSync('message.txt', 'Dummy')
    //     res.statusCode = 302
    //     res.setHeader('Location','/')
    //     return res.end()
    // }





    res.setHeader('content-type', 'text/html')
    res.write('<html>')
    res.write('<header><title>My First Page</title></header>')
    res.write('<body><h1>Hello from my Node.js Server</h1></body>')
    res.write('<html/>')
    // process.exit();
})

server.listen(3000)