import { IConfigurable } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { MemoryPersistence } from 'pip-services3-data-nodex';

import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsPersistence } from './IFacetsPersistence';

export class FacetsMemoryPersistence extends MemoryPersistence<FacetV1> 
    implements IConfigurable, IFacetsPersistence {
    protected _maxPageSize: number = 100;

    constructor() {
        super();
    }

    public configure(config: ConfigParams): void {
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }

    public async getPageByGroup(correlationId: string, group: string, paging: PagingParams): Promise<DataPage<FacetV1>> {
        let items = this._items.filter((item) => item.group == group && item.count > 0);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = items.length;
        
        if (skip > 0)
            items = items.slice(skip);
        items = items.slice(0, take);
        
        this._logger.trace(correlationId, "Retrieved %d items", items.length);
        
        let page = new DataPage<FacetV1>(items, total);
        return page;
    }

    public async addOne(correlationId: string, group: string, name: string): Promise<FacetV1> {

        let item = this._items.find((item) => item.group == group && item.name == name);
        if (item != null) {
            item.count++;
        } else {
            item = new FacetV1(group, name, 1);
            this._items.push(item);
        }

        this._logger.trace(correlationId, "Added item %s-%s", item.group, item.name);

        await this.save(correlationId);

        return  item;
    }

    public async removeOne(correlationId: string, group: string, name: string): Promise<FacetV1> {
        let item = this._items.find((item) => item.group == group && item.name == name);
        if (item != null) {
            item.count = item.count > 0 ? item.count - 1 : 0;
        } else {
            item = new FacetV1(group, name, 0);
            this._items.push(item);
        }

        this._logger.trace(correlationId, "Removed item %s-%s", item.group, item.name);

        await this.save(correlationId);

        return item; 
    }

    public async deleteByGroup(correlationId: string, group: string): Promise<void> {
        let deleted = 0;
        for (let index = this._items.length - 1; index>= 0; index--) {
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

        await this.save(correlationId);
    }

}
