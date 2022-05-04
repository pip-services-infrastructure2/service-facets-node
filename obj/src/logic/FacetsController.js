"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacetsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const FacetsCommandSet_1 = require("./FacetsCommandSet");
class FacetsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(FacetsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new FacetsCommandSet_1.FacetsCommandSet(this);
        return this._commandSet;
    }
    getFacetsByGroup(correlationId, group, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByGroup(correlationId, group, paging);
        });
    }
    addFacet(correlationId, group, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.addOne(correlationId, group, name);
        });
    }
    removeFacet(correlationId, group, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.removeOne(correlationId, group, name);
        });
    }
    deleteFacetsByGroup(correlationId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._persistence.deleteByGroup(correlationId, group);
        });
    }
    clear(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._persistence.clear(correlationId);
        });
    }
}
exports.FacetsController = FacetsController;
FacetsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-facets:persistence:*:*:1.0');
//# sourceMappingURL=FacetsController.js.map