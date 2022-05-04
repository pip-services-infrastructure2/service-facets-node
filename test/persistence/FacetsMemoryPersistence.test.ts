import { FacetsMemoryPersistence } from '../../src/persistence/FacetsMemoryPersistence';
import { FacetsPersistenceFixture } from './FacetsPersistenceFixture';

suite('FacetsMemoryPersistence', ()=> {
    let persistence: FacetsMemoryPersistence;
    let fixture: FacetsPersistenceFixture;
    
    setup(async () => {
        persistence = new FacetsMemoryPersistence();
        fixture = new FacetsPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('Add and Remove Facets', async () => {
        await fixture.testAddAndRemoveFacets();
    });

});