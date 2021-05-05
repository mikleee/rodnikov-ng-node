const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/products');
const db = require('./db/db');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded());
app.use(fileUpload({createParentPath: true, debug: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'public/view'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/suppliers', require('./routes/product.suppliers.routes'));
app.use('/api/groups', require('./routes/product.groups.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/document', require('./routes/document.routes'));


module.exports = app;
