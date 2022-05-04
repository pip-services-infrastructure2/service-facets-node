import { FacetsFilePersistence } from '../../src/persistence/FacetsFilePersistence';
import { FacetsPersistenceFixture } from './FacetsPersistenceFixture';

suite('FacetsFilePersistence', ()=> {
    let persistence: FacetsFilePersistence;
    let fixture: FacetsPersistenceFixture;
    
    setup(async () => {
        persistence = new FacetsFilePersistence('./data/facets.test.json');

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