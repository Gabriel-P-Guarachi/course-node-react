const { v4: uuidv4 } = require('uuid');

const createComment = (comment, author) => {
    if (!comment && !author) {
        return null
    }
    let commentDB = {
        id: uuidv4(),
        comment,
        author
    }
    return commentDB;
}

const updateComment = (post, {idComment, comment, author}) => {
    const comments = post.comments;
    const posIndex = comments.findIndex( comment => comment.id === idComment );
    if (posIndex < 0) {
        return null;
    }
    comments[ posIndex ].comment = comment;
    comments[ posIndex ].author = author;

    return comments[ posIndex ];
}


const deleteComment = (post, idComment) => {
    const comments = post.comments;
    const posIndex = comments.findIndex( comment => comment.id === idComment );
    if (posIndex < 0) {
        return null;
    }
    return comments.splice( posIndex, 1 );
};



module.exports = {
    createComment,
    updateComment,
    deleteComment
}