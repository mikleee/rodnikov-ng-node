const {NotFoundException} = require("../exception/exceptions");
const ModelService = require("./model.service");
const {createDocumentFromFile} = require("./util.service");
const {modelsToIds, addToBundle} = require("./util.service");
const {ProductImageWrapper} = require("../wrapper/product.image.wrapper");
const {ProductImage} = require("../db/product.image.model");
const {Product} = require("../db/product.model");


class ProductImageService extends ModelService {

    constructor() {
        super(ProductImage);
    }

    async getProductImagesWrappersForProduct(id) {
        let results = Object.values(await this.getProductImagesWrappersForProductsByIds([id]));
        return results[0] || [];
    }

    async getProductImagesWrappersForProducts(products) {
        return this.getProductImagesWrappersForProductsByIds(
            modelsToIds(products)
        );
    }

    async getProductImagesForProductsByIds(productIds) {
        let result = {};
        if (productIds.length) {
            let images = await ProductImage.find({product: {$in: productIds}}).select(['main', 'product']);
            for (const image of images) {
                addToBundle(result, image.product, image);
            }
        }
        return result;
    }

    async getProductImagesWrappersForProductsByIds(productIds) {
        let result = {};
        let result1 = await this.getProductImagesForProductsByIds(productIds);
        for (const [product, images] of Object.entries(result1)) {
            result[product] = images.map(img => ProductImageService.#convertToWrapper(img))
        }
        return result;
    }


    async addProductImages(productId, productImages) {
        let result = [];
        let product = await ProductImageService.#getProduct(productId);
        for (const productImage of productImages) {
            let img = createDocumentFromFile(productImage);
            img.product = product;
            img = await ProductImage.create(img);
            result.push({id: img.id.toString()});
        }
        return result;
    }

    async makeImageMain(productId, imageId) {
        await ProductImageService.#getProduct(productId);
        let images = (await this.getProductImagesForProductsByIds([productId]))[productId];
        let target = images.filter(i => i.id === imageId)[0];
        if (target == null) {
            return Promise.reject(new NotFoundException())
        }
        target.main = true;
        let promises = [
            target.save()
        ]

        images.forEach(i => {
            if (i.id !== imageId && i.main) {
                i.main = false;
                promises.push(i.save())
            }
        });

        let result = await Promise.all(promises);
        return result[0];
    }


    static #convertToWrapper(image) {
        let productImageWrapper = new ProductImageWrapper();
        productImageWrapper.id = image.id;
        productImageWrapper.main = !!image.main;
        return productImageWrapper;
    }

    static async #getProduct(productId) {
        let product = await Product.findById(productId);
        if (product == null) {
            return Promise.reject(new NotFoundException())
        }
        return product;
    }

}


module.exports = new ProductImageService();