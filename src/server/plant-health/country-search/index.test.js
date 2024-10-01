import { countrySearchPage } from '~/src/server/plant-health/country-search/index';
import { countrySearchController } from '~/src/server/plant-health/country-search/controller';
import { server } from '~/src/server'; 
import Hapi from '@hapi/hapi'// Adjust the import based on your server setup




jest.mock('~/src/server/plant-health/country-search/controller', () => ({
  countrySearchController: {
    handler: jest.fn(),
    options: {}
  }
}));

describe('countrysearchPage plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await countrySearchPage.plugin.register(server);
  });
  
 

 test('should register the /plant-health/country-search route', () => {
    const routes = server.table()
    const countrysearchRoute = routes.find(
      (routes) => routes.path === '/plant-health/country-search' && routes.method === 'get'
    )
    expect(countrysearchRoute).toBeDefined()
    expect(countrysearchRoute.settings.handler).toBe(countrySearchController.handler)
  });
});










