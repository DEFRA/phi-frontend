import inert from '@hapi/inert'
import yar from '@hapi/yar'
import { health } from '~/src/server/health'
import { home } from '~/src/server/home'
import { plantHealth } from '~/src/server/plant-health'
import { purposeOfVisit } from '~/src/server/plant-health/purpose-of-visit'
import { importConfirmation } from '~/src/server/plant-health/import-confirmation'
import { searchPage } from '~/src/server/plant-health/search'
import { countrySearchPage } from '~/src/server/plant-health/country-search'
import { formatPage } from '~/src/server/plant-health/format'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files'
import { search } from '~/src/api/search'
import { config } from '~/src/config'
import { login } from '~/src/server/login'

const sessionCookiePassword = config.get('sessionCookiePassword')

const options = {
  storeBlank: false,
  cookieOptions: {
    password: sessionCookiePassword,
    isSecure: true
  }
}

const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])
      await server.register([
        health,
        home,
        plantHealth,
        purposeOfVisit,
        importConfirmation,
        searchPage,
        countrySearchPage,
        formatPage,
        search,
        login,
        serveStaticFiles
      ])
      await server.register({
        plugin: yar,
        options
      })
    }
  }
}

export { router }
