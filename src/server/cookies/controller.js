import { getDefaultLocaleData } from '../localisation'
const cookiesController = {
  handler: async (request, h) => {
    const data = await getDefaultLocaleData('cookie')

    const title = data?.cookies?.title
    const headings = data?.cookies?.headings
    const table1 = data?.cookies?.table1
    const table2 = data?.cookies?.table2
    const paragraphs = data?.cookies?.paragraphs
    const getHelpSection = data?.getHelpSection
    return h.view('cookies/index', {
      title,
      headings,
      table1,
      table2,
      paragraphs,
      getHelpSection
    })
  }
}

export { cookiesController }
