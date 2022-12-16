"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacetsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const FacetsMongoDbPersistence_1 = require("../persistence/FacetsMongoDbPersistence");
const FacetsFilePersistence_1 = require("../persistence/FacetsFilePersistence");
const FacetsMemoryPersistence_1 = require("../persistence/FacetsMemoryPersistence");
const FacetsController_1 = require("../logic/FacetsController");
const FacetsCommandableHttpServiceV1_1 = require("../services/version1/FacetsCommandableHttpServiceV1");
class FacetsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(FacetsServiceFactory.MemoryPersistenceDescriptor, FacetsMemoryPersistence_1.FacetsMemoryPersistence);
        this.registerAsType(FacetsServiceFactory.FilePersistenceDescriptor, FacetsFilePersistence_1.FacetsFilePersistence);
        this.registerAsType(FacetsServiceFactory.MongoDbPersistenceDescriptor, FacetsMongoDbPersistence_1.FacetsMongoDbPersistence);
        this.registerAsType(FacetsServiceFactory.ControllerDescriptor, FacetsController_1.FacetsController);
        this.registerAsType(FacetsServiceFactory.HttpServiceDescriptor, FacetsCommandableHttpServiceV1_1.FacetsCommandableHttpServiceV1);
    }
}
exports.FacetsServiceFactory = FacetsServiceFactory;
FacetsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-facets", "factory", "default", "default", "1.0");
FacetsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-facets", "persistence", "memory", "*", "1.0");
FacetsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-facets", "persistence", "file", "*", "1.0");
FacetsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-facets", "persistence", "mongodb", "*", "1.0");
FacetsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-facets", "controller", "default", "*", "1.0");
FacetsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-facets", "service", "commandable-http", "*", "1.0");
//# sourceMappingURL=FacetsServiceFactory.js.map