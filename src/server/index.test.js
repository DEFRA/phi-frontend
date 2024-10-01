import path from 'path';
import hapi from '@hapi/hapi';
import { createServer } from '~/src/server';
import { config } from '~/src/config';
import { nunjucksConfig } from '~/src/config/nunjucks';
import { router } from '~/src/server/router';
import { requestLogger } from '~/src/server/common/helpers/logging/request-logger';
import { catchAll } from '~/src/server/common/helpers/errors';
import { secureContext } from '~/src/server/common/helpers/secure-context';
import hapiCookie from '@hapi/cookie';

jest.mock('@hapi/hapi');
jest.mock('~/src/config');
jest.mock('~/src/config/nunjucks');
jest.mock('~/src/server/router');
jest.mock('~/src/server/common/helpers/logging/request-logger');
jest.mock('~/src/server/common/helpers/errors');
jest.mock('~/src/server/common/helpers/secure-context');
jest.mock('@hapi/cookie');

describe('createServer', () => {
  let server;

  beforeEach(() => {
    server = {
      register: jest.fn(),
      auth: {
        strategy: jest.fn(),
        default: jest.fn(),
      },
      ext: jest.fn(),
    };
    hapi.server.mockReturnValue(server);
    config.get = jest.fn((key) => {
      switch (key) {
        case 'isProduction':
          return true;
        case 'cookiePassword':
          return 'testPassword';
        case 'port':
          return 3000;
        case 'root':
          return '/test/root';
        default:
          return null;
      }
    });
  });

  it('should create and configure the server', async () => {
    await createServer();

    expect(hapi.server).toHaveBeenCalledWith({
      port: 3000,
      routes: {
        validate: {
          options: {
            abortEarly: false,
          },
        },
        files: {
          relativeTo: path.resolve('/test/root', '.public'),
        },
        security: {
          hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: false,
          },
          xss: 'enabled',
          noSniff: true,
          xframe: true,
        },
      },
      router: {
        stripTrailingSlash: true,
      },
    });

    expect(server.register).toHaveBeenCalledWith(requestLogger);
    expect(server.register).toHaveBeenCalledWith(secureContext);
    expect(server.register).toHaveBeenCalledWith([hapiCookie]);
    expect(server.auth.strategy).toHaveBeenCalledWith('login', 'cookie', {
      cookie: {
        name: 'phi-cookie',
        path: '/',
        password: 'testPassword',
        isSecure: true,
      },
      redirectTo: '/',
      keepAlive: true,
      validate: expect.any(Function),
    });
    expect(server.auth.default).toHaveBeenCalledWith({ strategy: 'login', mode: 'required' });
    expect(server.register).toHaveBeenCalledWith(router);
    expect(server.register).toHaveBeenCalledWith(nunjucksConfig);
    expect(server.ext).toHaveBeenCalledWith('onPreResponse', catchAll);
  });

  it('should validate cookie content correctly', async () => {
    const validate = server.auth.strategy.mock.calls.validate;
    const request = {};
    const session = { password: 'testPassword' };

    const result = await validate(request, session);
    expect(result).toEqual({ isValid: true });
  });
});
