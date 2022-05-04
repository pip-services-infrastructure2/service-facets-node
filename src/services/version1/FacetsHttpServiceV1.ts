import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class FacetsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/facets');
        this._dependencyResolver.put('controller', new Descriptor('service-facets', 'controller', 'default', '*', '1.0'));
    }
}