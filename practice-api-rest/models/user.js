const { users } = require('../db/database');
const { v4: uuidv4 } = require('uuid');

const getUsers = () => {
    return users;
}

const getUser = (userId) => {
    return users.find(user => user.id === userId);
}

const createUser = ({ name, email, password, role }) => {
    if(!name && !email && !password && !role) {
        return null;
    }
    let user = {
        id: uuidv4(),
        name,
        email,
        password,
        role,
        state: true
    };
    users.push(user); // guardando
    return user;
}

const updateUser = (id, name, email, password, role, state = true) => {
    let userIndex = users.findIndex(user => user.id === id);
    if(userIndex < 0) {
        return null;
    }
    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].password = password;
    users[userIndex].role = role;
    users[userIndex].state = state;

    return users[userIndex];
}

const deleteUser = (id) => {
    let userIndex = users.findIndex(user => user.id === id);
    if(userIndex < 0) {
        return null;
    }
    return users.splice(userIndex, 1);
}

const findUser = (email) => {
    return users.find( user => user.email === email);
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    findUser
}