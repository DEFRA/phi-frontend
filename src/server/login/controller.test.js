import { loginController, authController } from '~/src/server/login/controller';
import { config } from '~/src/config';

jest.mock('~/src/config');

describe('loginController', () => {
  let request, h;

  beforeEach(() => {
    request = {
      auth: { isAuthenticated: false },
      yar: {
        get: jest.fn(),
        set: jest.fn()
      }
    };
    h = {
      redirect: jest.fn(),
      view: jest.fn()
    };
  });

  it('should redirect to /home if authenticated', () => {
    request.auth.isAuthenticated = true;

    loginController.handler(request, h);

    expect(h.redirect).toHaveBeenCalledWith('/home');
  });

  it('should render login page if not authenticated', () => {
    request.auth.isAuthenticated = false;
    request.yar.get.mockReturnValueOnce({ errors: 'some errors' }).mockReturnValueOnce({ errorMessage: 'some error message' });

    loginController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('errors', null);
    expect(request.yar.set).toHaveBeenCalledWith('errorMessage', null);
    expect(h.view).toHaveBeenCalledWith('login/index', {
      pageTitle: 'Check plant health information and import rules — GOV.UK',
      heading: 'Login Page',
      page: 'home',
      serviceName: '',
      errors: 'some errors',
      errorMessage: 'some error message'
    });
  });
});

describe('authController', () => {
  let request, h;

  beforeEach(() => {
    request = {
      payload: { password: '' },
      yar: {
        set: jest.fn()
      },
      cookieAuth: {
        set: jest.fn()
      }
    };
    h = {
      redirect: jest.fn()
    };
    config.get.mockReturnValue('correctPassword');
  });

  it('should redirect to /home if password is correct', () => {
    request.payload.password = 'correctPassword';

    authController.handler(request, h);

    expect(request.cookieAuth.set).toHaveBeenCalledWith({ password: 'correctPassword' });
    expect(h.redirect).toHaveBeenCalledWith('/home');
  });

  it('should redirect to / with error if password is incorrect', () => {
    request.payload.password = 'wrongPassword';

    authController.handler(request, h);

    expect(request.yar.set).toHaveBeenCalledWith('errors', {
      errors: {
        titleText: 'There is a problem',
        errorList: [
          {
            text: 'The password is not correct',
            href: '#password'
          }
        ]
      }
    });
    expect(request.yar.set).toHaveBeenCalledWith('errorMessage', {
      errorMessage: {
        text: 'The password is not correct'
      }
    });
    expect(h.redirect).toHaveBeenCalledWith('/');
  });
});
