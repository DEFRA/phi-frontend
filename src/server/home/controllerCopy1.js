import { getDefaultLocaleData } from '../localisation'
import { buildRedisClient } from '~/src/server/common/helpers/redis-client'
import nunjucks from 'nunjucks'
import path from 'path'
import { createLogger } from '~/src/server/common/helpers/logging/logger'

const client = buildRedisClient()
const logger = createLogger()

const renderAndCacheTemplate = (templateName, context, key) => {
  return new Promise((resolve, reject) => {
    nunjucks.render(
      path.join(__dirname, '\\index.njk'),
      context,
      (err, html) => {
        if (err) {
          logger.error(err)
          return reject(err)
        }

        // Cache the rendered static content
        client.setex(key, 3600, html, (err) => {
          if (err) {
            logger.error(err)
            return reject(err)
          }
        })

        resolve(html)
      }
    )
  })
}

const homeController = {
  handler: async (request, h) => {
    // Clear session data

    request.yar.set('purposeOfVisitRadiooption', null)
    request.yar.set('importConfirmationRadiooption', null)
    request.yar.set('searchQuery', null)
    request.yar.set('countrySearchQuery', null)
    request.yar.set('format', null)

    const data = getDefaultLocaleData('home')
    const context = {
      govukCaption: data?.govukcaption,
      govukHeading: data?.govukheading,
      govukBodyTitle: data?.govukbodytitle,
      buttonText: data?.buttonText,
      publishedSection: data?.publishedSection,
      appliesToSection: data?.appliesToSection,
      textBeforeStartNowSection: data?.textBeforeStartNowSection,
      textAfterStartNowSection: data?.textAfterStartNowSection,
      relatedContentSection: data?.relatedContentSection,
      getHelpSection: data?.getHelpSection,
      pageTitle: 'Start page',
      heading: '',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Environment',
          href: '/'
        },
        {
          text: 'Animal and plant health',
          href: '/'
        }
      ]
    }
    const key = 'home'
    return new Promise((resolve, reject) => {
      client.get(key, async (err, data) => {
        if (err) {
          logger.error('Redis error: ', err)
          return reject(h.response('Internal Server Error').code(500))
        }

        if (data) {
          // Serve content from cache
          resolve(h.response(data))
        } else {
          // Render the Nunjucks template and cache it
          try {
            const html = await renderAndCacheTemplate('index', context, key)
            resolve(h.response(html))
          } catch (err) {
            reject(h.response('Internal Server Error').code(500))
          }
        }
      })
    })
  }
}

export { homeController }
