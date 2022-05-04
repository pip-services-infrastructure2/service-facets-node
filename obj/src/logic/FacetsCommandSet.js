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
exports.FacetsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
class FacetsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetFacetsByGroupCommand());
        this.addCommand(this.makeAddFacetCommand());
        this.addCommand(this.makeRemoveFacetCommand());
        this.addCommand(this.makeDeleteFacetsByGroupCommand());
        this.addCommand(this.makeClearCommand());
    }
    makeGetFacetsByGroupCommand() {
        return new pip_services3_commons_nodex_2.Command("get_facets_by_group", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('group', pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty('paging', new pip_services3_commons_nodex_6.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let group = args.getAsNullableString("group");
            let paging = pip_services3_commons_nodex_3.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getFacetsByGroup(correlationId, group, paging);
        }));
    }
    makeAddFacetCommand() {
        return new pip_services3_commons_nodex_2.Command("add_facet", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('group', pip_services3_commons_nodex_5.TypeCode.String)
            .withRequiredProperty('name', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let group = args.getAsNullableString("group");
            let name = args.getAsNullableString("name");
            return yield this._logic.addFacet(correlationId, group, name);
        }));
    }
    makeRemoveFacetCommand() {
        return new pip_services3_commons_nodex_2.Command("remove_facet", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('group', pip_services3_commons_nodex_5.TypeCode.String)
            .withRequiredProperty('name', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let group = args.getAsNullableString("group");
            let name = args.getAsNullableString("name");
            return yield this._logic.removeFacet(correlationId, group, name);
        }));
    }
    makeDeleteFacetsByGroupCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_facets_by_group", new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty('group', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let group = args.getAsNullableString("group");
            return yield this._logic.deleteFacetsByGroup(correlationId, group);
        }));
    }
    makeClearCommand() {
        return new pip_services3_commons_nodex_2.Command("clear", new pip_services3_commons_nodex_4.ObjectSchema(true), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            return yield this._logic.clear(correlationId);
        }));
    }
}
exports.FacetsCommandSet = FacetsCommandSet;
//# sourceMappingURL=FacetsCommandSet.js.map