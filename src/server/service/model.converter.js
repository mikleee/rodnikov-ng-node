const mongoose = require('mongoose');
const Model = mongoose.Model;

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

module.exports = {
    toClient: toClient
};