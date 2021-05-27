const productsService = require("../service/products.service");
const productsShowcaseService = require("../service/products.showcase.service");
const {ShowcaseWrapperRequest} = require("../wrapper/showcase.model.wrappers");
const {sendJson, toArray, handleError} = require("./controller.util");


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

    submit(req, res, next) {
        productsService.saveOrUpdate(req.body).then(
            value => sendJson(res, productsService._toWrapper(value, req.user)),
            error => next(error),
        );
    }

    delete(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productsService.delete(id));
    }

}


module.exports = new ProductController();