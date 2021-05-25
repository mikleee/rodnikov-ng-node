const mongoose = require('mongoose');
const {NotFoundException} = require("../exception/exceptions");
const Model = mongoose.Model;
const logger = require('../service/logger').createLogger('controller.util')


function toClient(input) {
    if (input == null) {
        return null;
    } else if (input instanceof Array) {
        let result = [];
        for (const i of input) {
            result.push(toClient(i));
        }
        return result;
    } else if (input instanceof Model) {
        let result = input.toObject();
        result.id = input._id.toString();
        delete result._id;
        delete result.__v;
        return result;
    } else {
        return input;
    }
}

function sendJson(response, input) {
    if (input instanceof Promise || input instanceof mongoose.Query) {
        input.then(
            value => sendJson(response, value),
            error => handleError(response, error),
        );
    } else {
        let result = toClient(input);
        response.json(result)
    }
}

function handleError(response, error) {
    let message;
    if (error instanceof Error) {
        message = error.message;
        logger.error(error.stack);
    } else {
        message = error;
        logger.error(error);
    }
    response.status(500).json({message: message});
}

function toArray(value) {
    if (value == null) {
        return [];
    } else if (value instanceof Array) {
        return value;
    } else {
        return [value]
    }
}


function downloadFile(res, document) {
    if (document) {
        res.set('Content-Disposition', `attachment; filename="${document.name}"`);
        res.set('Content-Type', document.contentType);
        res.send(document.content);
    } else {
        res.status(404);
    }
    res.end();
}

function sendFile(res, document) {
    if (document) {
        res.set('Content-Disposition', 'inline');
        res.set('Content-Type', document.contentType);
        res.send(document.content);
    } else {
        res.status(404);
    }
    res.end();

}


module.exports = {
    sendJson: sendJson,
    handleError: handleError,
    toArray: toArray,
    downloadFile: downloadFile,
    sendFile: sendFile,
};