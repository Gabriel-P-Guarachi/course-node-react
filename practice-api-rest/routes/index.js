const express = require('express');

const app = express();


app.use(require('./comments'));
app.use(require('./login'));
app.use(require('./posts'));
app.use(require('./users'));

module.exports = app;