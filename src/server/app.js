const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const db = require('./db/db');
const {handleError} = require("./controller/controller.util");


const app = express();

app.use(logger('dev'));
app.use(express.urlencoded());
app.use(fileUpload({createParentPath: true, debug: false}));
app.use(express.json({}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/ngjs')));
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'public/view'));
app.set('view engine', 'ejs');


{   // auth
    const session = require('express-session');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const userService = require('./service/user.service');

    app.use(session({secret: 'you secret key'}))
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use('local-passport-strategy', new LocalStrategy(async (username, password, done) => {
        return await userService.resolveUser(username, password, done);
    }));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}

{   // routes
    app.use('/api/suppliers', require('./routes/product.suppliers.routes'));
    app.use('/api/categories', require('./routes/product.categories.routes'));
    app.use('/api/products', require('./routes/products.routes'));
    app.use('/api/document', require('./routes/document.routes'));
    app.use('/api/product-attribute-templates', require('./routes/product.attribute.templates.routes'));
    app.use('/api/product-attributes', require('./routes/product.attribute.routes'));
    app.use('/api/configurations', require('./routes/configuration.routes'));
    app.use('/api/auth', require('./routes/auth.routes'));
    app.use('/', require('./routes/render'));
    app.use((error, req, res, next) => handleError(res, error));
}


{   // schedulers
    require('./service/currency.rate.synch.service').schedule();
}


module.exports = app;