import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { FacetV1 } from '../data/version1/FacetV1';

export interface IFacetsController {
    getFacetsByGroup(correlationId: string, group: string, paging: PagingParams): Promise<DataPage<FacetV1>>;

    addFacet(correlationId: string, group: string, name: string): Promise<FacetV1>;

    removeFacet(correlationId: string, group: string, name: string): Promise<FacetV1>;

    deleteFacetsByGroup(correlationId: string, group: string): Promise<void>;

    clear(correlationId: string): Promise<void>;
}
