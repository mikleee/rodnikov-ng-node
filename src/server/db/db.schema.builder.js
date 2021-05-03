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

    schema.pre(['save'], async function (next) {
        await assignMeta(this, this.isNew);
        next();
    });

    schema.pre(['insertMany'], function (next, data) {
        data?.forEach(model => assignMeta(model, true))
        next();
    });


    return schema;
}

async function assignMeta(model, isNew) {
    if (isNew) {
        model.createdDate = new Date();
    }
    model.modifiedDate = new Date();
}


module.exports = {
    buildSchema: buildSchema
}