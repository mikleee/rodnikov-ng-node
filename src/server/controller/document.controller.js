const documentService = require("../service/document.service");
const {sendJson} = require("./controller.util");


class DocumentController {

    async download(req, res, next) {
        const id = req.params['id'];
        let document = await getDocument(id);
        res.set('Content-Disposition', `attachment; filename="${document.name}"`);
        res.set('Content-Type', document.contentType);
        res.send(document.content);
        res.end();
    }

    async get(req, res, next) {
        const id = req.params['id'];
        let document = await getDocument(id);
        res.set('Content-Disposition', 'inline');
        res.set('Content-Type', document.contentType);
        res.send(document.content);
        res.end();
    }

    delete(req, res, next) {
        const id = req.params['id'];
        sendJson(res, documentService.delete(id));
    }

}

function getDocument(id) {
    let document = documentService.findById(id);
    if (document == null) {
        throw new NotFoundException(`document ${id} not found`);
    }
    return document;
}

module.exports = new DocumentController();