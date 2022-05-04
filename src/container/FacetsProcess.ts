import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { FacetsServiceFactory } from '../build/FacetsServiceFactory';

export class FacetsProcess extends ProcessContainer {

    public constructor() {
        super("facets", "Faceted search microservice");
        this._factories.add(new FacetsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
