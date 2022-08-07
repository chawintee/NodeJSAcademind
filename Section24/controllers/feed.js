exports.getPosts = (req, res, next) => {
    res.json({
        posts: [{title: 'First Post', content: 'This is the first post!'}]
    })
}

exports.createPost = (req, res, next) => {
    // const title = req.body.title;
    // const content = req.body.content;
    const {title, content} = req.body
    // Create post in db
    console.log({title,content});
    res.json({
        message: 'Post created successfully!',
        post: {
            _id: new Date().toISOString(),
            title,
            content
        }
    })
}