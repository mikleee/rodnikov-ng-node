const {ProductCategory} = require("./product.category.model");
const {ProductSupplier} = require("./product.supplier.model");
const {Document} = require("./document.model");
const enums = require("./model.enum");
const {Product} = require("./product.model");


(async () => {

    await (async () => {
        let existing = await ProductSupplier.find();
        let toCreate = [];
        while (toCreate.length + existing.length < 20) {
            toCreate.push({
                name: `supplier ${random()}`
            })
        }
        if (toCreate.length) {
            await ProductSupplier.insertMany(toCreate);
        }

    })();


    await (async () => {
        let existing = await ProductCategory.find();
        let toCreate = [];
        while (toCreate.length + existing.length < 20) {
            toCreate.push({
                name: `cat ${random()}`
            })
        }
        if (toCreate.length) {
            await ProductCategory.insertMany(toCreate);
        }

        existing = await ProductCategory.find();
        for (let x of [
            {p: 0, c: [1, 2, 3]},
            {p: 5, c: [6, 7, 8]}
        ]) {
            let parent = existing[x.p];
            for (let c of x.c) {
                let child = existing[c];
                child.parent = parent;
                await child.save();
            }
        }


    })();


    await (async () => {
        let supplier = await ProductSupplier.findOne();
        let category = await ProductCategory.findOne();

        let existing = await Product.find();
        let toCreate = [];
        while (toCreate.length + existing.length < 20) {
            toCreate.push({
                name: `product ${random()}`,
                description: `description ${random()}`,
                cost: randomNumber(200),
                additionalCost: randomNumber(10),
                priceUplift: randomNumber(15),
                category: category,
                supplier: supplier,
                additionalImages: []
            })
        }


        if (toCreate.length) {
            await Product.insertMany(toCreate);
        }


    })();


})();


function createImageDocument(path, type) {
    return Document.create({
        name: require('path').basename(path),
        type: type,
        contentType: 'png',
        content: require('fs').readFileSync(path, 'utf8'),
    });
}


function random() {
    let result = [];
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

function randomNumber(max) {
    let number = Math.floor(Math.random() * max) || 1;
    return number.toFixed(2);
}