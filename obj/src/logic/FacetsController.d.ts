import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsController } from './IFacetsController';
export declare class FacetsController implements IConfigurable, IReferenceable, ICommandable, IFacetsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getFacetsByGroup(correlationId: string, group: string, paging: PagingParams): Promise<DataPage<FacetV1>>;
    addFacet(correlationId: string, group: string, name: string): Promise<FacetV1>;
    removeFacet(correlationId: string, group: string, name: string): Promise<FacetV1>;
    deleteFacetsByGroup(correlationId: string, group: string): Promise<void>;
    clear(correlationId: string): Promise<void>;
}
