function buildNavigation(request) {
  return [
    {
      text: 'Plant-health',
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
