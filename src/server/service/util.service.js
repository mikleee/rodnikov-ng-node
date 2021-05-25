module.exports = {
    modelsToMap: modelsToMap,
    modelsToIds: modelsToIds,
    addToBundle: addToBundle,
    createDocumentFromFile: createDocumentFromFile,
    populateDocumentFromFile: populateDocumentFromFile,
}


function modelsToIds(models) {
    return models.map(m => m.id);
}

function modelsToMap(models) {
    return [...models].reduce((acc, m) => {
        acc[m.id] = m;
        return acc;
    }, {});
}

function addToBundle(bundles, identifier, entity) {
    let bundle = bundles[identifier];
    if (!bundle) {
        bundle = [];
        bundles[identifier] = bundle;
    }
    bundle.push(entity);
}

function populateDocumentFromFile(doc, file) {
    doc.name = file.name;
    doc.contentType = file.mimetype;
    doc.content = file.data;
    return doc;
}

function createDocumentFromFile(file) {
    return populateDocumentFromFile({}, file);
}