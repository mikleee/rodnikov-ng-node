class DatatableResponse {
    results = [];
    total = 0;

    constructor(results, total) {
        this.results = results;
        this.total = total;
    }
}

module.exports = {
    DatatableResponse: DatatableResponse,
};