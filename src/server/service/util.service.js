module.exports = {
    modelsToMap: modelsToMap,
    modelsToIds: modelsToIds,
    addToBundleBundle: addToBundleBundle,
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

function addToBundleBundle(bundles, identifier, entity) {
    let bundle = bundles[identifier];
    if (!bundle) {
        bundle = [];
        bundles[identifier] = bundle;
    }
    bundle.push(entity);
}