const productImagesService = require("../service/product.image.service");
const {sendJson, toArray, sendFile} = require("./controller.util");


class ProductImageController {

    async getImage(req, res, next) {
        const id = req.params['id'];
        sendFile(res, await productImagesService.findById(id));
    }

    async uploadImages(req, res, next) {
        let id = req.body.id;
        let images = toArray(req.files.images);
        sendJson(res, await productImagesService.addProductImages(id, images));
    }

    async makeImageMain(req, res, next) {
        let productId = req.body.productId;
        let imageId = req.body.imageId;
        sendJson(res, await productImagesService.makeImageMain(productId, imageId));
    }

    async delete(req, res, next) {
        const id = req.params['id'];
        sendJson(res, await productImagesService.delete(id));
    }

}


module.exports = new ProductImageController();