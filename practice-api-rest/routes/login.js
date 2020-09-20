const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { findUser } = require('../models/user');
const { SEED } = require('../config/config');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    let user = findUser(body.email);
    if(!user) {
        return res.status(401).json({
            ok: false,
            message: 'El usuario o el password es incorrecto'
        });
    }
    // en este punto el email es valido
    // validar el password
    if(!bcrypt.compareSync(body.password, user.password)) {
        return res.status(401).json({
            ok: false,
            message: 'El usuario o el password es incorrecto'
        });
    }
    // 60 seg * 60 min * 24hrs * 30 days
    let token = jwt.sign({ user }, SEED, { expiresIn: 60 * 60 * 24 * 30 });
    res.json({
        ok: true,
        user,
        token
    })
});

module.exports = app;
