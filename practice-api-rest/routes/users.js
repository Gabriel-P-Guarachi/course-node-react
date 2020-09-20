const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

const { verifyToken, verifyRole } = require('../middlewares/auth');

const { getUsers, getUser, createUser, deleteUser, updateUser } = require('../models/user');

/**
 * GET => Leer Informacion
 * POST => Crear Informacion
 * PUT => Actualizar Informacion
 * DELETE => Eliminar Informacion
*/

// Devolver lista de usuarios
app.get('/users', [verifyToken, verifyRole], (req, res) => {
    let users = getUsers();
    if(!users) {
        return res.status(400).json({
            ok: false,
            message: 'There is no users'
        })
    }
    let total = users.length;
    res.json({
        ok: true,
        users: users,
        total
    });
});

// Devolver un usuario por su id
app.get('/users/:userId',[verifyToken, verifyRole],  (req, res) => {
    let userId = req.params.userId;
    let user = getUser(userId);
    if(!user) {
        return res.status(404).json({
            ok: false,
            err: 'user not found'
        });
    }
    res.json({
        ok: true,
        user
    });
});
// crear nuevo usuario
app.post('/users', (req, res) => {
    let body = req.body;
    let user = {
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    };

    let userDB = createUser(user);
    if(!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'There is no posible to create the user'
        });
    }
    res.status(201).json({
        ok: true,
        user: userDB
    });
});

app.put("/users/:userId", [verifyToken, verifyRole], (req, res) => {
    let userId = req.params.userId;
    let body = req.body;
    let user = {
      id: userId,
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role,
      state: body.state,
    };
  
    let userDB = updateUser(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.state
    );
    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: "There is no user to update",
      });
    }
    res.json({
      ok: true,
      user: userDB,
    });
  });

// Borrar un usuario
app.delete('/users/:userId',[verifyToken, verifyRole],  (req, res) => {
    let userId = req.params.userId;
    let removed = deleteUser(userId);
    if(!removed) {
        return res.status(404).json({
            ok: false,
            err: 'user not found'
        });
    }
    res.json({
        ok: true,
        user: removed
    })
})

module.exports = app;