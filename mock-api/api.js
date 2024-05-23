const { products } = require('./products')
const fs = require('fs')
const path = require('path')
const plantJson = `./products/plants.json`
const filePath = path.join(__dirname, plantJson)
const plants = JSON.parse(fs.readFileSync(filePath, 'utf8'))

module.exports = { products, plants }
