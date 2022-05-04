"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacetsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const FacetsMemoryPersistence_1 = require("./FacetsMemoryPersistence");
class FacetsFilePersistence extends FacetsMemoryPersistence_1.FacetsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.FacetsFilePersistence = FacetsFilePersistence;
//# sourceMappingURL=FacetsFilePersistence.js.map