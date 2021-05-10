class ModelService {
    modelType;

    constructor(modelType) {
        this.modelType = modelType;
    }

    getAll() {
        return this.modelType.find()
    }

    findById(id) {
        return this.modelType.findOne({_id: id});
    }

    async saveOrUpdate(model) {
        let result;
        if (model.id) {
            await this.modelType.findByIdAndUpdate({_id: model.id}, model);
            result = await this.modelType.findById(model.id);
        } else {
            result = await this.modelType.create(model);
        }
        return result;
    }

    findByIdAndUpdate(id, object) {
        return this.modelType.findByIdAndUpdate(id, object);
    }

    delete(id) {
        return this.modelType.deleteOne({_id: id});
    }

    /**
     * @returns String[]
     */
    toIds(models) {
        return models.map(m => m.id);
    }

    toMap(models) {
        return [...models].reduce((acc, m) => {
            acc[m.id] = m;
            return acc;
        }, {});
    }


}

module.exports = ModelService;