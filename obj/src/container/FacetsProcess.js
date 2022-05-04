"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacetsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const FacetsServiceFactory_1 = require("../build/FacetsServiceFactory");
class FacetsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("facets", "Faceted search microservice");
        this._factories.add(new FacetsServiceFactory_1.FacetsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.FacetsProcess = FacetsProcess;
//# sourceMappingURL=FacetsProcess.js.map