import { problemWithServiceController } from '~/src/server/check-plant-health-information-and-import-rules/problem-with-service/controller';
import Hapi from '@hapi/hapi';

describe('problemWithServiceController', () => {
  let server;

  beforeAll(() => {
    server = Hapi.server();
    server.route({
      method: 'GET',
      path: '/test',
      handler: problemWithServiceController.handler,
    });
  });

  const makeRequest = async (statusCode) => {
    const request = {
      method: 'GET',
      url: `/test?statusCode=${statusCode}`,
    };
    return await server.inject(request);
  };

  test.each([
    { statusCode: 404, expectedMessage: 'Page not found', expectedTitle: 'Error: Page not found — Check plant health information and import rules — GOV.UK' },
    { statusCode: 403, expectedMessage: 'Forbidden', expectedTitle: 'Error: Check plant health information and import rules — GOV.UK' },
    { statusCode: 401, expectedMessage: 'Unauthorized', expectedTitle: 'Error: Check plant health information and import rules — GOV.UK' },
    { statusCode: 400, expectedMessage: 'Bad Request', expectedTitle: 'Error: Check plant health information and import rules — GOV.UK' },
    { statusCode: 500, expectedMessage: 'Something went wrong', expectedTitle: 'Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK' },
    { statusCode: 502, expectedMessage: 'Something went wrong', expectedTitle: 'Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK' },
    { statusCode: 503, expectedMessage: 'Something went wrong', expectedTitle: 'Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK'},
    { statusCode: 504, expectedMessage: 'Something went wrong', expectedTitle: 'Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK'},
  ])('should return correct view for statusCode $statusCode', async ({ statusCode, expectedMessage, expectedTitle }) => {
    const response = await makeRequest(statusCode);
    expect(response.statusCode).toBe(statusCode);
    expect(response.result).toEqual({
      statusCode,
      pageTitle: expectedTitle,
      heading: statusCode,
      message: expectedMessage,
    });
  });
});
