const express = require('express');

const feedController = require('../controllers/feed.js')

const router = express.Router()
// GET /feed/posts
router.get('/posts', feedController.getPosts)

router.post('/post', feedController.createPost)

module.exports = router