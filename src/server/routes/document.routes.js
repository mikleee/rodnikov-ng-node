const documentService = require("../service/document.service");
const {NotFoundException} = require("../exception/exceptions");
const router = require('express').Router();

router.get('/download/:id', async (req, res, next) => {
    const id = req.params['id'];
    let document = await getDocument(id);
    res.set('Content-Disposition', `attachment; filename="${document.name}"`);
    res.set('Content-Type', document.contentType);
    res.send(document.content);
    res.end();
});

router.get('/get/:id', async (req, res, next) => {
    const id = req.params['id'];
    let document = await getDocument(id);
    res.set('Content-Disposition', 'inline');
    res.set('Content-Type', document.contentType);
    res.send(document.content);
    res.end();
});

router.post('/delete/:id', async (req, res, next) => {
    const id = req.params['id'];
    return await documentService.delete(id);
});

router.post('/upload', async (req, res, next) => {
    let files;
    if (req.files.file instanceof Array) {
        files = req.files.file;
    } else {
        files = [req.files.file];
    }
    res.json(await documentService.attachDocumentsTo(files, req.query['type'], req.query['target']));
});

function getDocument(id) {
    let document = documentService.findById(id);
    if (document == null) {
        throw new NotFoundException(`document ${id} not found`);
    }
    return document;
}

module.exports = router;
