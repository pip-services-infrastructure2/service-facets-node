const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { FacetsMemoryPersistence } from '../../src/persistence/FacetsMemoryPersistence';
import { FacetsController } from '../../src/logic/FacetsController';

suite('FacetsController', ()=> {
    let persistence: FacetsMemoryPersistence;
    let controller: FacetsController;

    suiteSetup(() => {
        persistence = new FacetsMemoryPersistence();
        controller = new FacetsController();

        let references: References = References.fromTuples(
            new Descriptor('service-facets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-facets', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);
    });
    
    setup(async () => {
        await persistence.clear(null);
    });

    test('Add and Remove Facets', async () => {
        // Add facet 1
        let facet = await controller.addFacet(null, "test", "group1");

        assert.equal(facet.group, "test");
        assert.equal(facet.name, "group1");
        assert.equal(facet.count, 1);

        // Remove facet 1
        facet = await controller.removeFacet(null, "test", "group2");

        assert.equal(facet.group, "test");
        assert.equal(facet.name, "group2");
        assert.equal(facet.count, 0);

        // Read facets
        let page = await controller.getFacetsByGroup(null, 'test', null);

        assert.lengthOf(page.data, 1);

        // Delete facets
        await controller.deleteFacetsByGroup(null, 'test');

        // Read facets
        page = await controller.getFacetsByGroup(null, 'test', null);

        assert.lengthOf(page.data, 0);
    });
    
});