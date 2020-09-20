const { posts } = require('../db/database');
const { v4: uuidv4 } = require('uuid');

const getPosts = () => {
    return posts;
}

const getPost = (postId) => {
    return posts.find( post => post.id === postId );
}

const createPost = ({userId, title, description}) => {
    if (!userId && !title && !description) {
        return null;
    }
    let post = {
        id: uuidv4(),
        userId,
        title,
        description,
        comments: []
    }
    posts.push( post );
    return post;
}

const updatePost = (id, title, description) => {
    let posIndex = posts.findIndex(post => post.id === id);
    if (posIndex < 0) {
        return null;
    }
    posts[ posIndex ].title = title;
    posts[ posIndex ].description = description;

    return posts[ posIndex ];
}

const deletePost = (id) => {
    let posIndex = posts.findIndex(post => post.id === id);
    if (posIndex < 0) {
        return null;
    }
    return posts.splice( posIndex, 1 );
}

module.exports = {
    createPost,
    deletePost,
    getPosts,
    getPost,
    updatePost
}