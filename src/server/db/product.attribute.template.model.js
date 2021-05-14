const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: {type: Schema.Types.String, unique: true, required: true}
});

const ProductAttributeTemplate = mongoose.model('ProductAttributeTemplate', schema);

module.exports.ProductAttributeTemplate = ProductAttributeTemplate;