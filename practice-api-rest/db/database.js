const users = [
    {
        id: '1',
        name: 'Chris',
        email: 'chris@sample.com',
        password: 'admin123',
        role: 'USER_ROLE',
        state: true
    },
    {
        id: '2',
        name: 'Marcelo',
        email: 'marcelo@sample.com',
        password: 'admin123',
        role: 'USER_ROLE',
        state: true
    }
];
const posts = [
    {
        id: '1',
        userId: '1',
        title: 'Mi primer post de Javascript',
        description: 'lorem ipsum',
        comments: [
            {
                id: '1', 
                comment: 'lorem ipsum', 
                author: 'Chris'
            }
        ]
    }
];

module.exports = {
    users,
    posts
}