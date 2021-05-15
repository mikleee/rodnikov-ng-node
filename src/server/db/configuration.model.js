const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const enums = require("./model.enum");
const Schema = mongoose.Schema;

let allowedKeys = Object.values(enums.ConfigurationKey);

let schema = schemaBuilder.buildSchema({
    key: {type: Schema.Types.String, enum: allowedKeys, required: true, unique: true},
    value: Schema.Types.Mixed
});

const Configuration = mongoose.model('Configuration', schema);

// populate
(async () => {
    let configs = await Configuration.find();
    let persistedKeys = configs.map(c => c.key);

    for (const key of allowedKeys) {
        if (!persistedKeys.includes(key)) {
            await Configuration.create({key: key, value: null});
        }
    }

    for (const key of persistedKeys) {
        if (!allowedKeys.includes(key)) {
            await Configuration.deleteOne({key: key});
        }
    }
})();

module.exports.Configuration = Configuration;