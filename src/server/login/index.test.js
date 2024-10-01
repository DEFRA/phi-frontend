import { login } from '~/src/server/login/index';
import Hapi from '@hapi/hapi';

describe('login plugin', () => {
  let server;

  beforeAll(async () => {
    server = Hapi.server();
    await login.plugin.register(server);
  });

  afterAll(async () => {
    await server.stop();
  });

  test('GET / should return 200', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    });
    expect(response.statusCode).toBe(200);
  });

  test('POST / should return 200', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/'
    });
    expect(response.statusCode).toBe(200);
  });

  test('GET /logout should redirect to /', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/logout'
    });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/');
  });
});
