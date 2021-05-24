const userService = require("../service/user.service");
const {UserWrapper} = require("../wrapper/user.wrapper");
const {SessionWrapper} = require("../wrapper/session.wrapper");
const {sendJson, toArray} = require("./controller.util");


class AuthController {

    getSession(req, res, next) {
        let result = new SessionWrapper();
        let session = req.session;
        if (session) {
            result.id = session.id;
        }
        let user = req.user;
        if (user) {
            let userWrapper = new UserWrapper();
            userWrapper.userName = user.userName;
            result.user = userWrapper;
        }
        sendJson(res, result);
    }

    resolveUser(username, password) {
        let user = users[username];
        if (!user) {
            throw new Error('auth.username.invalid');
        }
        if (password !== user.password) {
            throw new Error('auth.password.invalid');
        }

        return user;
    }

    async login(req, res, next) {
        const userName = req.query.userName;
        const password = req.query.password;
        const redirect = decodeURI(req.query.redirect ?? '/');


        let user = await userService.findByUserName(userName);
        if (user == null) {
            return sendJson(res, {ok: false, login: false});
        }

        if (!await userService.isPasswordValid(userName, password)) {
            return sendJson(res, {ok: false, password: false});
        }

        req.login(user, err => err ? next(err) : sendJson(res, {ok: true, redirect: redirect}));
    }

    logout(req, res, next) {
        req.logout()
        sendJson(res, {ok: true, redirect: '/'});
    }

    checkAuthForRestCall(req, res, next) {
        if (req.hasOwnProperty('user')) {
            next();
        } else {
            res.status(401);
            res.end();
        }
    }

    checkAuthForRenderCall(req, res, next) {
        if (req.hasOwnProperty('user')) {
            next();
        } else {
            res.status(401);
            res.redirect(`/login?redirect=${req.url}`);
        }
    }

}


module.exports = new AuthController();