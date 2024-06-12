const { products } = require('./products')
const fs = require('fs')
const path = require('path')
const plantJson = `./products/plants.json`
const pestJson = `./products/pests.json`
const filePath = path.join(__dirname, plantJson)
const plants = JSON.parse(fs.readFileSync(filePath, 'utf8'))
const pestFilePath = path.join(__dirname, pestJson)
const pests = JSON.parse(fs.readFileSync(pestFilePath, 'utf8'))

module.exports = { products, plants, pests }
