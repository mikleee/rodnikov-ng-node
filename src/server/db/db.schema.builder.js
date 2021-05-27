const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require('../service/logger').createLogger('db.schema.builder');


function buildSchema(definitions) {

    let schema = new Schema({
        createdDate: Schema.Types.Date,
        modifiedDate: Schema.Types.Date,
        ...definitions
    });

    schema
        .virtual('id')
        .get(function () {
            return this._id ? this._id.toString() : null;
        })

    schema.post('validate', function (model) {
        if (model.isNew) {
            model.createdDate = new Date();
        }
        model.modifiedDate = new Date();
    });

    schema.set('toJSON', {
        minimize: true,
        transform: function (model) {
            let object = model._doc;
            let result = {};
            for (const [key, value] of Object.entries(object)) {
                if (value instanceof Buffer) {
                    result[key] = (value.length / 1024).toFixed(2) + ' Kb';
                } else {
                    result[key] = value;
                }
            }
            return result;
        }
    });

    onDelete(schema, function (target, model) {
        logger.debug(`Delete ${model.modelName}: ${JSON.stringify(target)}`);
    })

    return schema;
}

function generateFriendlyId(idObj) {
    let hash = 0, i, chr, id = idObj.toString();
    if (id.length === 0) return hash;
    for (i = 0; i < id.length; i++) {
        chr = id.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

function onDelete(schema, callback) {
    schema.pre(['deleteMany', 'deleteOne'], {document: true, query: true}, async function (next) {
        let results = await this.model.find(this._conditions);
        let promises = [];
        for (const result of results) {
            promises.push(callback(result, this.model));
        }
        if (promises.length) {
            await Promise.all(promises);
        }
        next();
    });
}


module.exports = {
    buildSchema: buildSchema,
    onDelete: onDelete,
    generateFriendlyId: generateFriendlyId
}