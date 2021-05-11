const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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


module.exports = {
    buildSchema: buildSchema,
    generateFriendlyId: generateFriendlyId
}