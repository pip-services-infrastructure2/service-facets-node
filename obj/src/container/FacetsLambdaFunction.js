"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.FacetsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const FacetsServiceFactory_1 = require("../build/FacetsServiceFactory");
class FacetsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("facets", "Faceted search function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-facets', 'controller', 'default', '*', '*'));
        this._factories.add(new FacetsServiceFactory_1.FacetsServiceFactory());
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
    }
}
exports.FacetsLambdaFunction = FacetsLambdaFunction;
exports.handler = new FacetsLambdaFunction().getHandler();
//# sourceMappingURL=FacetsLambdaFunction.js.map