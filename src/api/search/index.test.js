import { server } from '@hapi/hapi'
import { search } from '~/src/api/search'
import { searchController } from '~/src/api/search/controller'

jest.mock('~/src/api/search/controller')

describe('search plugin', () => {
  let serverInstance

  beforeAll(async () => {
    serverInstance = new server()
    await serverInstance.register(search.plugin)
  })

  it('should register the search plugin', () => {
    expect(serverInstance.registrations).toHaveProperty('search')
  })

  //   it('should register /search/plants route', () => {
  //     const route = serverInstance.lookup('/search/plants');
  //     expect(route).toBeDefined();
  //     expect(route.method).toBe('get');
  //     expect(route.settings.handler).toBe(searchController.handler);
  //   });

  //   it('should register /search/pests route', () => {
  //     const route = serverInstance.lookup('/search/pests');
  //     expect(route).toBeDefined();
  //     expect(route.method).toBe('get');
  //     expect(route.settings.handler).toBe(searchController.handler);
  //   });

  //   it('should register /search/countries route', () => {
  //     const route = serverInstance.lookup('/search/countries');
  //     expect(route).toBeDefined();
  //     expect(route.method).toBe('get');
  //     expect(route.settings.handler).toBe(searchController.handler);
  //   });
})
