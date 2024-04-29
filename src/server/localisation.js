import { config } from '~/src/config'

function getDefaultLocaleData(page) {
  const i18n = require('i18n')
  const fs = require('fs')
  const path = require('path')
  const localeLang = config.get('locale').value
  i18n.configure({
    locales: [localeLang],
    directory: path.join(__dirname, 'locales/page'),
    defaultLocale: localeLang,
    objectNotation: true,
    updateFiles: false
  })
  i18n.setLocale(localeLang)
  const localePath = `/locales/${page}/${localeLang}.json`
  const filePath = path.join(__dirname, localePath)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  return data
}
export { getDefaultLocaleData }
