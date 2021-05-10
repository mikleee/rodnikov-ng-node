const {toClient} = require("../service/model.converter");
const logger = require("../service/logger").createLogger('router');
const router = require('express');

class Router {
    router = router.Router();

    get(path, handler) {
        this.router.get(path, (request, response, next) => this.handle(request, response, next, handler));
        return this;
    }

    post(path, handler) {
        this.router.post(path, (request, response, next) => this.handle(request, response, next, handler));
        return this;
    }

    async handle(request, response, next, handler) {
        try {
            let data = await handler(request, response, next);
            if (data != null) {
                response.json(toClient(data));
            } else {
                response.end();
            }
        } catch (error) {
            this.defaultErrorHandlerCallback(error, response)
        }
    }

    defaultErrorHandlerCallback(error, response) {
        logger.error(error.stack);
        let code = 500;
        response.status(code);
        response.send(JSON.stringify({message: error.message}));
    }

    toArray(value) {
        if (value == null) {
            return [];
        } else if (value instanceof Array) {
            return value;
        } else {
            return [value]
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Router





