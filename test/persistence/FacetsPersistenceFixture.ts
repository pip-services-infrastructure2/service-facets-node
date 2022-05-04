const assert = require('chai').assert;

import { IFacetsPersistence } from '../../src/persistence/IFacetsPersistence';
    
export class FacetsPersistenceFixture {
    private _persistence: IFacetsPersistence;
    
    constructor( persistence) {
        assert.isNotNull( persistence);
        this._persistence =  persistence;
    }

    public async testAddAndRemoveFacets() {
        // Add facet 1
        let facet = await this._persistence.addOne(null, "test", "group1");

        assert.equal(facet.group, "test");
        assert.equal(facet.name, "group1");
        assert.equal(facet.count, 1);

        // Remove facet 1
        facet = await this._persistence.removeOne(null, "test", "group2");

        assert.equal(facet.group, "test");
        assert.equal(facet.name, "group2");
        assert.equal(facet.count, 0);

        // Read facets
        let page = await this._persistence.getPageByGroup(null, 'test', null);

        assert.lengthOf(page.data, 1);

        // Delete facets
        await this._persistence.deleteByGroup(null, 'test');

        // Read facets
        page = await this._persistence.getPageByGroup(null, 'test', null);

        assert.lengthOf(page.data, 0);
    }

}
