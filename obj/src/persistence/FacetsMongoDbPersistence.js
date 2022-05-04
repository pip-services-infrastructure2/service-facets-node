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
exports.FacetsMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
const FacetV1_1 = require("../data/version1/FacetV1");
class FacetsMongoDbPersistence extends pip_services3_mongodb_nodex_1.MongoDbPersistence {
    constructor() {
        super('facets');
        this._maxPageSize = 100;
    }
    configure(config) {
        super.configure(config);
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }
    convertToPublic(value) {
        if (value)
            delete value._id;
        return super.convertToPublic(value);
    }
    getPageByGroup(correlationId, group, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filter to select non-zero facets
            let filter = {
                group: group,
                count: { $gt: 0 }
            };
            // Adjust max item count based on configuration
            paging = paging || new pip_services3_commons_nodex_1.PagingParams();
            let skip = paging.getSkip(-1);
            let take = paging.getTake(this._maxPageSize);
            let pagingEnabled = paging.total;
            // Configure options
            let options = {};
            let sort;
            if (skip >= 0)
                options.skip = skip;
            options.limit = take;
            if (sort != null)
                options.sort = sort;
            let items = yield this._collection.find(filter, options).toArray();
            if (items != null)
                this._logger.trace(correlationId, "Retrieved %d from %s", items.length, this._collection);
            items = items || [];
            items = items.map(this.convertToPublic);
            let count = null;
            if (pagingEnabled)
                count = yield this._collection.countDocuments(filter);
            return new pip_services3_commons_nodex_2.DataPage(items, count);
        });
    }
    addOne(correlationId, group, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {
                group: group,
                name: name
            };
            let newItem = {
                $inc: { count: 1 }
            };
            let options = {
                returnDocument: 'after',
                upsert: true,
                // returnNewDocument: true
            };
            let res = yield this._collection.findOneAndUpdate(filter, newItem, options);
            this._logger.trace(correlationId, "Set in %s with %s - %s", this._collection, group, name);
            let updatedItem = this.convertToPublic(res.value);
            return updatedItem;
        });
    }
    removeOne(correlationId, group, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {
                group: group,
                name: name,
                count: { $gt: 0 }
            };
            let newItem = {
                $inc: { count: -1 }
            };
            let options = {
                returnDocument: 'after',
                upsert: false
            };
            let res = yield this._collection.findOneAndUpdate(filter, newItem, options);
            this._logger.trace(correlationId, "Set in %s with %s - %s", this._collection, group, name);
            let updatedItem;
            if (res.value == null)
                updatedItem = new FacetV1_1.FacetV1(group, name, 0);
            else
                updatedItem = this.convertToPublic(res.value);
            return updatedItem;
        });
    }
    deleteByGroup(correlationId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = { group: group };
            let count = yield this._collection.remove(filter);
        });
    }
}
exports.FacetsMongoDbPersistence = FacetsMongoDbPersistence;
//# sourceMappingURL=FacetsMongoDbPersistence.js.map