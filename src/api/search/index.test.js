
import { search } from '~/src/api/search/index';
import { searchController } from '~/src/api/search/controller';
import { server } from '~/src/server'; 
import Hapi from '@hapi/hapi'// Adjust the import based on your server setup




jest.mock('~/src/api/search/controller', () => ({
  searchController: {
    handler: jest.fn(),
    options: {}
  }
}));

describe('search plugin', () => {
  let server

  beforeAll(async () => {
    server = Hapi.server()
    await search.plugin.register(server);
  });
  
 

 test('should register the /api/search route', () => {
    const routes = server.table()
    const searchRoute = routes.find(
      (routes) => routes.path === '/api/search' && routes.method === 'get'
    )
    expect(searchRoute).toBeDefined()
    expect(searchRoute.settings.handler).toBe(searchController.handler)
  });
});










