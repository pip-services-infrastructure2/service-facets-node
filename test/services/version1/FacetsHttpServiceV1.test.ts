const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { FacetsMemoryPersistence } from '../../../src/persistence/FacetsMemoryPersistence';
import { FacetsController } from '../../../src/logic/FacetsController';
import { FacetsHttpServiceV1 } from '../../../src/services/version1/FacetsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);


suite('FacetsHttpServiceV1', ()=> {
    let persistence: FacetsMemoryPersistence;
    let service: FacetsHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        persistence = new FacetsMemoryPersistence();
        let controller = new FacetsController();

        service = new FacetsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-facets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-facets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-facets', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
        await persistence.clear(null);
    });
    
    test('Add and Remove Facets', async () => {
        // Add facet 1
        let facet = await new Promise<any>((resolve, reject) => {
            rest.post("/v1/facets/add_facet",
                {
                    group: "test",
                    name: "group1"
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.equal(facet.group, "test");
        assert.equal(facet.name, "group1");
        assert.equal(facet.count, 1);

        // Remove facet 1
        facet = await new Promise<any>((resolve, reject) => {
            rest.post("/v1/facets/remove_facet",
                {
                    group: "test",
                    name: "group2"
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.equal(facet.group, "test");
        assert.equal(facet.name, "group2");
        assert.equal(facet.count, 0);

        // Read facets
        let page = await new Promise<any>((resolve, reject) => {
            rest.post("/v1/facets/get_facets_by_group",
                {
                    group: "test"
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(page.data, 1);

        // Delete facets
        await new Promise<any>((resolve, reject) => {
            rest.post("/v1/facets/delete_facets_by_group",
                {
                    group: "test"
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Read facets
        page = await new Promise<any>((resolve, reject) => {
            rest.post("/v1/facets/get_facets_by_group",
                {
                    group: "test"
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(page.data, 0);
    });

});