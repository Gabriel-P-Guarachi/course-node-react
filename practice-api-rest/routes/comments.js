

const express = require('express');
const app = express();

const { getPost } = require('../models/post');
const { 
    createComment,
    updateComment,
    deleteComment
} = require('../models/comment');

/**
 * Obtain comments of one post
 */
app.get('/posts/:postId/comments', (req, res) => {
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
        comments: post.comments,
        total: post.comments.length
    })
});

/**
 * Create one commnet
 */
app.post('/posts/:postId/comments', (req, res) => {
    let postId = req.params.postId;
    let post = getPost( postId );
    if (!post) {
        return res.status(404).json({
            ok: false,
            error: `The [post: ${postId}] doesn't exist`
        });
    }

    let body = req.body;
    let commentDB = createComment(body.comment, body.author);
    if (!commentDB) {
        return res.status(400).json({
            ok: false,
            message: 'Cannot create a comment.'
        });
    }
    post.comments.push( commentDB );

    res.status(201).json({
        ok: true,
        comment: commentDB
    })

});

/**
 * Update a comment
 */
app.put('/posts/:postId/comments', (req, res) => {
    let postId = req.params.postId;
    let post = getPost( postId );
    if (!post) {
        return res.status(404).json({
            ok: false,
            error: `The [post: ${postId}] doesn't exist`
        });
    }
    let body = req.body;
    let comment = {
        idComment: body.id,
        comment: body.comment,
        author: body.author
    };
    let commentDB = updateComment( post, comment );
    if (!commentDB) {
        return res.status(400).json({
            ok: false,
            error: `The [comment: ${comment.idComment}] doesn't exist`
        });
    }
    res.json({
        ok: true,
        comment: commentDB
    })
});

/**
 * Remove comment
 */
app.delete('/posts/:postId/comments/:commentId', (req, res) => {
    let postId = req.params.postId;
    let commentId = req.params.commentId;

    let post = getPost( postId );
    if (!post) {
        return res.status(404).json({
            ok: false,
            error: `The [post: ${postId}] doesn't exist`
        });
    }

    let removeComment = deleteComment( post, commentId );
    if (!removeComment) {
        return res.status(400).json({
            ok: false,
            error: `Comment [${commentId}] doesn't exist`
        });
    }

    res.json({
        ok: true,
        comment: removeComment
    }); 
});

module.exports = app;