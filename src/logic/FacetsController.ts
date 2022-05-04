import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsPersistence } from '../persistence/IFacetsPersistence';
import { IFacetsController } from './IFacetsController';
import { FacetsCommandSet } from './FacetsCommandSet';

export class FacetsController implements IConfigurable, IReferenceable, ICommandable, IFacetsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-facets:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(FacetsController._defaultConfig);
    private _persistence: IFacetsPersistence;
    private _commandSet: FacetsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IFacetsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new FacetsCommandSet(this);
        return this._commandSet;
    }
    
    public async getFacetsByGroup(correlationId: string, group: string, paging: PagingParams): Promise<DataPage<FacetV1>> {
        return await this._persistence.getPageByGroup(correlationId, group, paging);
    }

    public async addFacet(correlationId: string, group: string, name: string): Promise<FacetV1> {
        return await this._persistence.addOne(correlationId, group, name);
    }

    public async removeFacet(correlationId: string, group: string, name: string): Promise<FacetV1> {
        return await this._persistence.removeOne(correlationId, group, name);
    }

    public async deleteFacetsByGroup(correlationId: string, group: string): Promise<void> {
        await this._persistence.deleteByGroup(correlationId, group);
    }

    public async clear(correlationId: string): Promise<void> {
        await this._persistence.clear(correlationId);
    }

}
