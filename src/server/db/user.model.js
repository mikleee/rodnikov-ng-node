const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    userName: {type: Schema.Types.String, unique: true, required: true},
    password: {type: Schema.Types.String, required: true}
});

const User = mongoose.model('User', schema);

module.exports.User = User;