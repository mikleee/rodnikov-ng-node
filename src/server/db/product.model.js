const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    cost: Schema.Types.Number,
    priceUplift: Schema.Types.Number,
    category: {type: Schema.Types.ObjectId, ref: 'ProductCategory'},
    supplier: {type: Schema.Types.ObjectId, ref: 'ProductSupplier'},
    mainImage: {type: Schema.Types.ObjectId, ref: 'Document'},
    additionalImages: [{type: Schema.Types.ObjectId, ref: 'Document'}]
});


const Product = mongoose.model('Product', schema);

module.exports.Product = Product;