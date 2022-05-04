import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';

import { FacetsServiceFactory } from '../build/FacetsServiceFactory';

export class FacetsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("facets", "Faceted search function");
        this._dependencyResolver.put('controller', new Descriptor('service-facets', 'controller', 'default', '*', '*'));
        this._factories.add(new FacetsServiceFactory());
        this._factories.add(new DefaultRpcFactory);
    }
}

export const handler = new FacetsLambdaFunction().getHandler();