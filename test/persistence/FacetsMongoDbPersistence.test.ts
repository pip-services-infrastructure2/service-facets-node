import { ConfigParams } from 'pip-services3-commons-nodex';

import { FacetsMongoDbPersistence } from '../../src/persistence/FacetsMongoDbPersistence';
import { FacetsPersistenceFixture } from './FacetsPersistenceFixture';

suite('FacetsMongoDbPersistence', ()=> {
    let persistence: FacetsMongoDbPersistence;
    let fixture: FacetsPersistenceFixture;

    setup(async () => {
        var MONGO_DB = process.env["MONGO_DB"] || "test";
        var MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "facets";
        var MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
        var MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
        var MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

        var dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );

        persistence = new FacetsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new FacetsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });

    test('Add and Remove Facets', async () => {
        await fixture.testAddAndRemoveFacets();
    });
});