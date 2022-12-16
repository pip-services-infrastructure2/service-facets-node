"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacetsCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class FacetsCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/facets');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-facets', 'controller', 'default', '*', '1.0'));
    }
}
exports.FacetsCommandableHttpServiceV1 = FacetsCommandableHttpServiceV1;
//# sourceMappingURL=FacetsCommandableHttpServiceV1.js.map