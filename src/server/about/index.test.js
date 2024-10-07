import { about } from '~/src/server/about';
import { aboutController } from '~/src/server/about/controller';

describe('about plugin', () => {
  let server;

  beforeEach(() => {
    server = {
      route: jest.fn(),
    };
  });

  it('should register the about route', async () => {
    await about.plugin.register(server);

    expect(server.route).toHaveBeenCalledWith([
      {
        method: 'GET',
        path: '/about',
        ...aboutController,
      },
    ]);
  });

  it('should have the correct plugin name', () => {
    expect(about.plugin.name).toBe('about');
  });
});
