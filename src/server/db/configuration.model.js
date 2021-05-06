const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const enums = require("./model.enum");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    enum: Object.values(enums.ConfigurationKey),
    value: Schema.Types.String
});

const Configuration = mongoose.model('Configuration', schema);


module.exports.Configuration = Configuration;