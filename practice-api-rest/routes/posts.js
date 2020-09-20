const express = require('express');
const app = express();

const { 
    createPost, 
    deletePost,
    getPosts, 
    getPost,
    updatePost
} = require('../models/post');
const { verifyUserExist } = require('../middlewares/user');

/**
 * Obtain all posts
 */
app.get('/posts', (req, res) => {
    let posts = getPosts();
    if (!posts) {
        return res.status(400).json({
            ok: false,
            message: 'There are not posts'
        })
    }
    let total = posts.length;
    res.json({
        ok: true,
        posts,
        total
    });
});
/**
 * Obtain posts of a post
 */
app.get('/posts/:postId', (req, res) => {
    let postId = req.params.postId;
    let post = getPost( postId );
    if (!post) {
        return res.status(404).json({
            ok: false,
            error: `The [post: ${postId}] doesn't exist`
        });
    }
    res.json({
        ok: true,
        post
    })

});

/**
 * Create a new post
 */
app.post('/posts', verifyUserExist, (req, res) => {
    let body = req.body;
    let post = {
        userId: body.userId,
        title: body.title,
        description: body.description
    }

    let postDB = createPost( post );
    if( !postDB ) {
        return res.status(400).json({
            ok: false,
            message: 'Cannot create a post.'
        })
    }
    res.status(201).json({
        ok: true,
        post: postDB
    })
});

/**
 * Update post
 */
app.put('/posts/:postId', (req, res) => {
    let postId = req.params.postId;
    let body = req.body;
    let post = {
        title: body.title,
        description: body.description
    };
    let postDB = updatePost( postId, post.title, post.description );
    if (!postDB) {
        return res.status(400).json({
            ok: false,
            error: `The [post: ${postId}] doesn't exist`
        });
    }
    res.json({
        ok: true,
        post: postDB
    })
});

/**
 * Remove post
 */
app.delete('/posts/:postId', (req, res) => {
    let postId = req.params.postId;
    let removePost = deletePost( postId );
    if (!removePost) {
        return res.status(400).json({
            ok: false,
            error: `Post [${postId}] doesn't exist`
        });
    }
    return res.json({
        ok: true,
        post: removePost
    })
});




module.exports = app;