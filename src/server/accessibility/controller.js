import { getDefaultLocaleData } from '../localisation'
const accessibiltyController = {
  handler: async (request, h) => {
    const data = await getDefaultLocaleData('accessibility')
    const mainContent = data.mainContent

    return h.view('accessibility/index', {
      pageTitle:
        'Accessibilty statement — Check plant health information and import rules — GOV.UK',
      heading: '',
      mainContent
    })
  }
}

export { accessibiltyController }
