const productsService = require("../service/products.service");
const productsShowcaseService = require("../service/products.showcase.service");
const {ShowcaseWrapperRequest} = require("../wrapper/showcase.model.wrappers");
const {sendJson, toArray} = require("./controller.util");


class ProductController {

    list(req, res, next) {
        sendJson(res, productsService.getAllWrappers(req.user));
    }

    showcase(req, res, next) {
        let query = req.query;
        let request = new ShowcaseWrapperRequest();
        request.keyword = query['keyword'];
        request.category = query['category'];
        request.suppliers = toArray(query['suppliers']);
        sendJson(res, productsShowcaseService.getShowcaseProducts(request, req.user));
    }

    search(req, res, next) {
        let query = req.query;
        sendJson(res,
            productsShowcaseService.search(
                query['keyword'],
                query['limit'],
                req.user)
        );
    }

    product(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productsService.getWrapperById(id, req.user));
    }

    async submit(req, res, next) {
        let supplier = JSON.parse(req.body.product);
        let mainImage = req.files?.mainImage;
        let additionalImages = toArray(req.files?.additionalImages);
        let result = await productsService.saveOrUpdate(supplier, mainImage, additionalImages);
        sendJson(res, productsService._toWrapper(result, req.user));
    }


    delete(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productsService.delete(id));
    }

}


module.exports = new ProductController();