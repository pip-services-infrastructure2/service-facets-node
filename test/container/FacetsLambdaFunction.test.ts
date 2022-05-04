const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { FacetsLambdaFunction } from '../../src/container/FacetsLambdaFunction';


suite('FacetsLambdaFunction', ()=> {
    let lambda: FacetsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-facets:persistence:memory:default:1.0',
            'controller.descriptor', 'service-facets:controller:default:default:1.0'
        );

        lambda = new FacetsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('Add and Remove Facets', async () => {
        // Add facet 1
        let facet = await lambda.act(
            {
                role: "facets",
                cmd: "add_facet",
                group: "test",
                name: "group1"
            }
        );

        assert.equal(facet.group, "test");
        assert.equal(facet.name, "group1");
        assert.equal(facet.count, 1);

        // Remove facet 1
        facet = await lambda.act(
            {
                role: "facets",
                cmd: "remove_facet",
                group: "test",
                name: "group2"
            }
        );

        assert.equal(facet.group, "test");
        assert.equal(facet.name, "group2");
        assert.equal(facet.count, 0);

        // Read facets
        let page = await lambda.act(
            {
                role: "facets",
                cmd: "get_facets_by_group",
                group: "test"
            }
        );

        assert.lengthOf(page.data, 1);

        // Delete facets
        await lambda.act(
            {
                role: "facets",
                cmd: "delete_facets_by_group",
                group: "test"
            }
        );

        // Read facets
        page = await lambda.act(
            {
                role: "facets",
                cmd: "get_facets_by_group",
                group: "test"
            }
        );

        assert.lengthOf(page.data, 0);
    });
});