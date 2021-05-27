const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let productImageSchema = schemaBuilder.buildSchema({
    name: Schema.Types.String,
    main: Schema.Types.Boolean,
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    contentType: Schema.Types.String,
    content: Schema.Types.Buffer,
});
const ProductImage = mongoose.model('ProductImage', productImageSchema);


module.exports.ProductImage = ProductImage;