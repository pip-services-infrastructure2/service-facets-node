import { ConfigParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { MongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsPersistence } from './IFacetsPersistence';
export declare class FacetsMongoDbPersistence extends MongoDbPersistence<FacetV1> implements IFacetsPersistence {
    protected _maxPageSize: number;
    constructor();
    configure(config: ConfigParams): void;
    protected convertToPublic(value: any): any;
    getPageByGroup(correlationId: string, group: string, paging: PagingParams): Promise<DataPage<FacetV1>>;
    addOne(correlationId: string, group: string, name: string): Promise<FacetV1>;
    removeOne(correlationId: string, group: string, name: string): Promise<FacetV1>;
    deleteByGroup(correlationId: string, group: string): Promise<void>;
}
