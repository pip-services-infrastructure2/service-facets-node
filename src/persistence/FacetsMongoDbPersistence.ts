import { ConfigParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { MongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsPersistence } from './IFacetsPersistence';

export class FacetsMongoDbPersistence extends MongoDbPersistence<FacetV1> 
    implements IFacetsPersistence {
    protected _maxPageSize: number = 100;

    constructor() {
        super('facets');
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }

    
    protected convertToPublic(value: any): any {
        if (value) delete value._id;
        return super.convertToPublic(value);
    }

    public async getPageByGroup(correlationId: string, group: string, paging: PagingParams): Promise<DataPage<FacetV1>> {

        // Filter to select non-zero facets
        let filter = { 
            group: group, 
            count: { $gt: 0 } 
        };

        // Adjust max item count based on configuration
        paging = paging || new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let pagingEnabled = paging.total;

        // Configure options
        let options: any = {};
        let sort: any;

        if (skip >= 0) options.skip = skip;
        options.limit = take;
        if (sort != null) options.sort = sort;

        let items = await this._collection.find(filter, options).toArray();

        if (items != null)
            this._logger.trace(correlationId, "Retrieved %d from %s", items.length, this._collection);
        
        items = items || [];
        items = items.map(this.convertToPublic);

        let count: number = null;
        if (pagingEnabled)
            count = await this._collection.countDocuments(filter);

        return new DataPage<FacetV1>(items, count);
    }

    public async addOne(correlationId: string, group: string, name: string): Promise<FacetV1> {

        let filter = {
            group: group,
            name: name
        };

        let newItem = {
            $inc: { count: 1 }
        }

        let options = {
            returnDocument: 'after',
            upsert: true,
            // returnNewDocument: true
        };
        
        let res = await this._collection.findOneAndUpdate(filter, newItem, options);
        
        this._logger.trace(correlationId, "Set in %s with %s - %s", this._collection, group, name);

        let updatedItem = this.convertToPublic(res.value);

        return updatedItem;
    }

    public async removeOne(correlationId: string, group: string, name: string): Promise<FacetV1> {
        let filter = {
            group: group,
            name: name,
            count: { $gt: 0 }
        };

        let newItem = {
            $inc: { count: -1 }
        }

        let options = {
            returnDocument: 'after',
            upsert: false
        };

        let res = await this._collection.findOneAndUpdate(filter, newItem, options);

        this._logger.trace(correlationId, "Set in %s with %s - %s", this._collection, group, name);

        let updatedItem: FacetV1;

        if (res.value == null)
            updatedItem = new FacetV1(group, name, 0);
        else
            updatedItem = this.convertToPublic(res.value);
        return updatedItem;
        
    }

    public async deleteByGroup(correlationId: string, group: string): Promise<void> {
        let filter = { group: group };

        let count = await this._collection.remove(filter);
    }
}
