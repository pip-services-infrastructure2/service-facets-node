import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { FacetsMongoDbPersistence } from '../persistence/FacetsMongoDbPersistence';
import { FacetsFilePersistence } from '../persistence/FacetsFilePersistence';
import { FacetsMemoryPersistence } from '../persistence/FacetsMemoryPersistence';
import { FacetsController } from '../logic/FacetsController';
import { FacetsCommandableHttpServiceV1 } from '../services/version1/FacetsCommandableHttpServiceV1';

export class FacetsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-facets", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-facets", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-facets", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-facets", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-facets", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-facets", "service", "commandable-http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(FacetsServiceFactory.MemoryPersistenceDescriptor, FacetsMemoryPersistence);
		this.registerAsType(FacetsServiceFactory.FilePersistenceDescriptor, FacetsFilePersistence);
		this.registerAsType(FacetsServiceFactory.MongoDbPersistenceDescriptor, FacetsMongoDbPersistence);
		this.registerAsType(FacetsServiceFactory.ControllerDescriptor, FacetsController);
		this.registerAsType(FacetsServiceFactory.HttpServiceDescriptor, FacetsCommandableHttpServiceV1);
	}
	
}
