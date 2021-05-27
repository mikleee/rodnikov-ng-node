const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const {ProductAttribute} = require("./product.attribute.model");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: {type: Schema.Types.String, unique: true, required: true}
});
schemaBuilder.onDelete(schema, function (attributeTemplate) {
    return Promise.all([
        ProductAttribute.deleteMany({template: attributeTemplate._id}),
    ])
});
const ProductAttributeTemplate = mongoose.model('ProductAttributeTemplate', schema);

module.exports.ProductAttributeTemplate = ProductAttributeTemplate;