const mongoose = require('mongoose');
const schemaBuilder = require('./db.schema.builder');
const enums = require('./model.enum');
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: Schema.Types.String,
    type: {type: Schema.Types.String, enum: Object.values(enums.DocumentType), required: true},
    contentType: Schema.Types.String,
    content: Schema.Types.Buffer,
});


const Document = mongoose.model('Document', schema);


module.exports.Document = Document;