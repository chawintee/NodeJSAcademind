const reqHandler = (req,res) => {
    const url = req.url
    if(url === '/'){
        res.setHeader('content-type','text/html')
        res.write('<head><title> This is first assignment</title></head>')
        res.write('<html>')
        res.write('<div><h1>Hello!!!</h1></div>')
        res.write('<div><h1>This is first assignment</h1></div>')
        res.write('<form name="username" method="POST" action="/create-user"><input type="text" name="username"/><button type="submit">Submit</button></form>')
        res.write('</html>')
        return res.end()
    }
    if(url === '/users'){
        res.setHeader('content-type','text/html')
        res.write('<head><title> Users page </title></head>')
        res.write('<html>')
        res.write('<div><h1>Users</h1></div>')
        res.write('<div><ul><li>Ant</li>Bat<li>Cat</li><li>Duck</li><li>Elephant</li></ul></div>')
        res.write('</html>')
        return res.end()
    }
    if(url === '/create-user'){
        const body=[]
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk)
        })
        return req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString()
            console.log(parseBody);
            const user = parseBody.split('=')[1]
            console.log(user);
            res.statusCode = 302
            res.setHeader('Location','/')
            return res.end()

        })
    }
    return res.end()
}

module.exports = {reqHandler}