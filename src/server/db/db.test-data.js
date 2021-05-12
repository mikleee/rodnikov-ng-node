const {ProductCategory} = require("./product.category.model");
const {ProductSupplier} = require("./product.supplier.model");
const {Document} = require("./document.model");
const enums = require("./model.enum");
const {Product} = require("./product.model");


(async () => {


    await (async () => {
        let template = [
            'Adidas',
            'Pidoras',
            'Андрэ Тан',
            'Белшина',
            'Росава',
            'Sony',
            'Электроника',
            'Алёша',
        ];

        for (const name of template) {
            let persisted = await ProductSupplier.findOne({name: name});
            if (!persisted) {
                await ProductSupplier.create({
                    name: name
                });
            }
        }
    })();


    await (async () => {
        let template = [
            {
                name: 'Одежда', sub: [
                    {name: 'Шапки', sub: [{name: 'Зимние шапки'}, {name: 'Летние шапки'}]},
                    {
                        name: 'Обувь', sub: [
                            {name: 'Кроссовки'},
                            {
                                name: 'Туфли', sub: [
                                    {name: 'Туфли для Андрюхи', sub: [{name: 'Туфли для Андрюхи нарядные'}, {name: 'Туфли для Андрюхи повседневные'}]},
                                    {name: 'Туфли для обычных людей'}
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Штаны', sub: [
                            {name: 'Брюки'},
                            {name: 'Обсирашки'},
                            {name: 'Джинсы'},
                            {name: 'Трико'},
                            {name: 'Шаровары'},
                            {name: 'Клёш'},
                            {name: 'Лосины'},
                        ]
                    }
                ]
            },
            {name: 'Шины', sub: [{name: 'Зимние шины'}, {name: 'Летние шины'}]},
            {name: 'Элетроника', sub: [{name: 'Аудио & видео'}, {name: 'Транзисторы'}]},
            {name: 'Разная дрянь'}
        ];

        for (const obj of template) {
            await delai(obj, null);
        }

        async function delai(obj, parent) {
            let persisted = await ProductCategory.findOne({name: obj.name});
            if (persisted) {
                persisted.parent = parent;
                persisted = await persisted.save();
            } else {
                persisted = await ProductCategory.create({
                    name: obj.name,
                    parent: parent
                });
            }

            if (obj.sub) {
                for (const sub of obj.sub) {
                    await delai(sub, persisted);
                }
            }
        }


    })();


    await (async () => {

        let template = [
            {
                name: 'Одежда', supp: [
                    'Adidas',
                    'Pidoras',
                    'Андрэ Тан',
                    'Алёша',
                ]
            },
            {
                name: 'Шины', supp: [
                    'Белшина',
                    'Росава',
                    'Алёша',
                ]
            },
            {
                name: 'Элетроника', supp: [
                    'Sony',
                    'Электроника',
                    'Алёша',
                ]
            },
            {
                name: 'Разная дрянь', supp: [
                    'Pidoras',
                    'Алёша',
                ]
            }
        ];

        let categories = await ProductCategory.find();
        let categoriesMap = {};
        for (const category of categories) {
            categoriesMap[category.id] = category;
        }


        let suppliers = await ProductSupplier.find();
        let suppliersMap = {};
        for (const supplier of suppliers) {
            suppliersMap[supplier.name] = supplier;
        }


        for (const category of categories) {
            let products = await Product.find({category: category});
            let toCreate = [];
            while (toCreate.length + products.length < 300) {
                let supplier = null;
                let root = getRootCategory(category);
                for (const t of template) {
                    if (t.name === root.name) {
                        let supplierName = getRandomFromArray(t.supp);
                        supplier = suppliersMap[supplierName];
                        break;
                    }
                }

                toCreate.push({
                    name: `${category.name} ${random()}`,
                    description: `${category.name} ${random()}`,
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
        }


        function getRootCategory(category) {
            let result = category;
            while (result.parent != null) {
                result = categoriesMap[result.parent];
            }
            return result;
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

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}