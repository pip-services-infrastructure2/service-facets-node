import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { FacetV1 } from '../data/version1/FacetV1';
export interface IFacetsPersistence {
    getPageByGroup(correlationId: string, group: string, paging: PagingParams): Promise<DataPage<FacetV1>>;
    addOne(correlationId: string, group: string, name: string): Promise<FacetV1>;
    removeOne(correlationId: string, group: string, name: string): Promise<FacetV1>;
    deleteByGroup(correlationId: string, group: string): Promise<void>;
    clear(correlationId: string): Promise<void>;
}
