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
exports.FacetsMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const FacetV1_1 = require("../data/version1/FacetV1");
class FacetsMemoryPersistence extends pip_services3_data_nodex_1.MemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 100;
    }
    configure(config) {
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }
    getPageByGroup(correlationId, group, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this._items.filter((item) => item.group == group && item.count > 0);
            // Extract a page
            paging = paging != null ? paging : new pip_services3_commons_nodex_1.PagingParams();
            let skip = paging.getSkip(-1);
            let take = paging.getTake(this._maxPageSize);
            let total = null;
            if (paging.total)
                total = items.length;
            if (skip > 0)
                items = items.slice(skip);
            items = items.slice(0, take);
            this._logger.trace(correlationId, "Retrieved %d items", items.length);
            let page = new pip_services3_commons_nodex_2.DataPage(items, total);
            return page;
        });
    }
    addOne(correlationId, group, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = this._items.find((item) => item.group == group && item.name == name);
            if (item != null) {
                item.count++;
            }
            else {
                item = new FacetV1_1.FacetV1(group, name, 1);
                this._items.push(item);
            }
            this._logger.trace(correlationId, "Added item %s-%s", item.group, item.name);
            yield this.save(correlationId);
            return item;
        });
    }
    removeOne(correlationId, group, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = this._items.find((item) => item.group == group && item.name == name);
            if (item != null) {
                item.count = item.count > 0 ? item.count - 1 : 0;
            }
            else {
                item = new FacetV1_1.FacetV1(group, name, 0);
                this._items.push(item);
            }
            this._logger.trace(correlationId, "Removed item %s-%s", item.group, item.name);
            yield this.save(correlationId);
            return item;
        });
    }
    deleteByGroup(correlationId, group) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleted = 0;
            for (let index = this._items.length - 1; index >= 0; index--) {
                let item = this._items[index];
                if (item.group == group) {
                    this._items.splice(index, 1);
                    deleted++;
                }
            }
            if (deleted == 0) {
                return;
            }
            this._logger.trace(correlationId, "Deleted %s items", deleted);
            yield this.save(correlationId);
        });
    }
}
exports.FacetsMemoryPersistence = FacetsMemoryPersistence;
//# sourceMappingURL=FacetsMemoryPersistence.js.map