const {ProductCategory} = require("./product.category.model");
const {ProductSupplier} = require("./product.supplier.model");
const {User} = require("./user.model");
const {ProductAttribute} = require("./product.attribute.model");
const {ProductAttributeTemplate} = require("./product.attribute.template.model");
const {Product} = require("./product.model");


let suppliersTemplate = [
    'Adidas',
    'Pidoras',
    'Андрэ Тан',
    'Белшина',
    'Росава',
    'Sony',
    'Электроника',
    'Алёша',
];

let categoriesTemplate = [
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

let productAttributesTemplateTemplate = [
    {name: 'Радиус', values: ['13 дюймов', '14 дюймов', '15 дюймов']},
    {name: 'Материал корпуса', values: ['Пластк', 'Стекло', 'Металл']},
    {name: 'Материал ткани', values: ['Хлопок', 'Лён', 'Кожа']},
    {name: 'Потребляемая мощность', values: ['220В', '360В', '5В']},
    {name: 'Цвет', values: ['красный', 'синий', 'зелёный']},
];

let categoryRelationsTemplate = [
    {
        name: 'Одежда',
        supp: [
            'Adidas',
            'Pidoras',
            'Андрэ Тан',
            'Алёша',
        ],
        attr: [
            'Материал ткани',
            'Цвет',
        ]
    },
    {
        name: 'Шины',
        supp: [
            'Белшина',
            'Росава',
            'Алёша',
        ]
        ,
        attr: [
            'Радиус'
        ]
    },
    {
        name: 'Элетроника',
        supp: [
            'Sony',
            'Электроника',
            'Алёша',
        ],
        attr: [
            'Материал корпуса',
            'Потребляемая мощность',
        ]
    },
    {
        name: 'Разная дрянь',
        supp: [
            'Pidoras',
            'Алёша',
        ],
        attr: [
            'Цвет'
        ]
    }
];

(async () => {


    // create users
    await (async () => {
        let users = [
            {userName: 'admin', password: 'admin'}
        ]
        for (const user of users) {
            let persisted = await User.findOne({userName: user.userName});
            if (!persisted) {
                await User.create(user);
            }
        }
    })();


    // create suppliers
    await (async () => {
        for (const name of suppliersTemplate) {
            let persisted = await ProductSupplier.findOne({name: name});
            if (!persisted) {
                await ProductSupplier.create({
                    name: name
                });
            }
        }
    })();


    // create categories
    await (async () => {
        for (const obj of categoriesTemplate) {
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


    // create product attribute template
    await (async () => {
        for (const template of productAttributesTemplateTemplate) {
            let persisted = await ProductAttributeTemplate.findOne({name: template.name});
            if (!persisted) {
                await ProductAttributeTemplate.create({
                    name: template.name
                });
            }
        }
    })();


    // create products
    await (async () => {

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

        let attributeTemplates = await ProductAttributeTemplate.find();
        let attributeTemplatesMap = {};
        for (const attributeTemplate of attributeTemplates) {
            attributeTemplatesMap[attributeTemplate.name] = attributeTemplate;
        }


        for (const category of categories) {
            let products = await Product.find({category: category});
            let toCreate = [];
            let max = randomNumber(40);
            while (toCreate.length + products.length < max) {
                let supplier = null;
                let root = getRootCategory(category);
                for (const t of categoryRelationsTemplate) {
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
                let products = await Product.insertMany(toCreate);
                let attributeNames = [];
                let root = getRootCategory(category);
                for (const t of categoryRelationsTemplate) {
                    if (t.name === root.name) {
                        attributeNames = t.attr;
                        break;
                    }
                }

                let attributesToCreate = [];
                for (const product of products) {
                    for (const attrName of attributeNames) {
                        attributesToCreate.push({
                            product: product,
                            template: attributeTemplatesMap[attrName],
                            value: getRandomFromArray(
                                productAttributesTemplateTemplate.filter(t => t.name === attrName)[0].values
                            )
                        });
                    }
                }

                if (attributesToCreate.length) {
                    let attributes = await ProductAttribute.insertMany(attributesToCreate);
                }

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