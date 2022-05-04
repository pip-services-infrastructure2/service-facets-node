import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { FacetsMemoryPersistence } from './FacetsMemoryPersistence';
import { FacetV1 } from '../data/version1/FacetV1';
export declare class FacetsFilePersistence extends FacetsMemoryPersistence {
    protected _persister: JsonFilePersister<FacetV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
