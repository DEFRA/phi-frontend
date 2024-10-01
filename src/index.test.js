import { createServer } from '~/src/server';
import { createLogger } from '~/src/server/common/helpers/logging/logger';
import { config } from '~/src/config';

jest.mock('~/src/server');
jest.mock('~/src/server/common/helpers/logging/logger');
jest.mock('~/src/config');

describe('startServer', () => {
  let logger;
  let server;

  beforeAll(() => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
    };
    createLogger.mockReturnValue(logger);

    server = {
      start: jest.fn(),
      logger: {
        info: jest.fn(),
      },
    };
    createServer.mockResolvedValue(server);

    config.get = jest.fn().mockReturnValue(3000);
  });

  it('should start the server and log success messages', async () => {
    await require('~/src/index'); // Import the file to trigger startServer

    expect(createServer).toHaveBeenCalled();
    expect(server.start).toHaveBeenCalled();
    expect(server.logger.info).toHaveBeenCalledWith('Server started successfully');
    expect(server.logger.info).toHaveBeenCalledWith('Access your frontend on http://localhost:3000');
  });

  it('should log an error if the server fails to start', async () => {
    const error = new Error('Server error');
    createServer.mockRejectedValueOnce(error);

    await require('~/src/index'); // Import the file to trigger startServer

    expect(logger.info).toHaveBeenCalledWith('Server failed to start :(');
    expect(logger.error).toHaveBeenCalledWith(error);
  });

  it('should handle unhandled rejections', () => {
    const error = new Error('Unhandled rejection');
    process.emit('unhandledRejection', error);

    expect(logger.info).toHaveBeenCalledWith('Unhandled rejection');
    expect(logger.error).toHaveBeenCalledWith(error);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
