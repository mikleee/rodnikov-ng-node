const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    code: {type: Schema.Types.String, unique: true, required: true},
    name: {type: Schema.Types.String, unique: true, required: true},
    description: Schema.Types.String,
    cost: Schema.Types.Number,
    priceUplift: Schema.Types.Number,
    category: {type: Schema.Types.ObjectId, ref: 'ProductCategory'},
    supplier: {type: Schema.Types.ObjectId, ref: 'ProductSupplier'},
    mainImage: {type: Schema.Types.ObjectId, ref: 'Document'},
    additionalImages: [{type: Schema.Types.ObjectId, ref: 'Document'}]
});

schema.pre('validate', function () {
    let model = this;
    if (model.isNew) {
        model.code = schemaBuilder.generateFriendlyId(model._id).toString();
    }
});

const Product = mongoose.model('Product', schema);

module.exports.Product = Product;