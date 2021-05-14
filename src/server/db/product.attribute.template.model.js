const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: Schema.Types.String
});

const ProductAttributeTemplate = mongoose.model('ProductAttributeTemplate', schema);

module.exports.ProductAttributeTemplate = ProductAttributeTemplate;