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
      redirect: jest.fn().mockReturnValue('redirected'),
      view: jest.fn().mockReturnValue('view rendered')
    };
  });

  it('should redirect to /home if authenticated', () => {
    request.auth.isAuthenticated = true;
    const response = loginController.handler(request, h);
    expect(h.redirect).toHaveBeenCalledWith('/home');
    expect(response).toBe('redirected');
  });

  it('should render login view if not authenticated', () => {
    request.auth.isAuthenticated = false;
    request.yar.get.mockReturnValueOnce({ errors: 'some errors' }).mockReturnValueOnce({ errorMessage: 'some error message' });
    const response = loginController.handler(request, h);
    expect(h.view).toHaveBeenCalledWith('login/index', {
      pageTitle: 'Check plant health information and import rules — GOV.UK',
      heading: 'Login Page',
      page: 'home',
      serviceName: '',
      errors: 'some errors',
      errorMessage: 'some error message'
    });
    expect(response).toBe('view rendered');
  });
});

describe('authController', () => {
  let request, h;

  beforeEach(() => {
    request = {
      payload: { password: 'wrongPassword' },
      yar: {
        set: jest.fn()
      },
      cookieAuth: {
        set: jest.fn()
      }
    };
    h = {
      redirect: jest.fn().mockReturnValue('redirected')
    };
    config.get.mockReturnValue('correctPassword');
  });

  it('should set cookie and redirect to /home if password is correct', () => {
    request.payload.password = 'correctPassword';
    const response = authController.handler(request, h);
    expect(request.cookieAuth.set).toHaveBeenCalledWith({ password: 'correctPassword' });
    expect(h.redirect).toHaveBeenCalledWith('/home');
    expect(response).toBe('redirected');
  });

  it('should set errors and redirect to / if password is incorrect', () => {
    request.payload.password = 'wrongPassword';
    const response = authController.handler(request, h);
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
    expect(response).toBe('redirected');
  });
});
