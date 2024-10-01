import { aboutController } from 'phi-frontend/src/server/about/controller';

describe('aboutController', () => {
  let request, h;

  beforeEach(() => {
    request = {};
    h = {
      view: jest.fn().mockReturnThis()
    };
  });

  it('should return the correct view with the expected data', () => {
    aboutController.handler(request, h);

    expect(h.view).toHaveBeenCalledWith('about/index', {
      pageTitle: 'About',
      heading: 'About',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'About'
        }
      ]
    });
  });
});
