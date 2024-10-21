function buildNavigation(request) {
  return [
    {
      text: 'Home',
      url: '/',
      isActive: request.path === '/plant-health'
    },
    {
      text: 'About',
      url: '/about',
      isActive: request.path === '/about'
    }
  ]
}

export { buildNavigation }
