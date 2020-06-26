const express = require('express')
const routes = express.Router()

const BooksToScrapeController = require('./controllers/BooksToScrapeController')
const ScrapeOlxController = require('./controllers/ScrapeOlxController')
const ScrapeECommerceController = require('./controllers/ScrapeECommerceController')
const ScrapePromobitController = require('./controllers/ScrapePromobitController')

routes.post('/books', BooksToScrapeController.index)
routes.post('/ecommerce', ScrapeECommerceController.index)
routes.post('/olx', ScrapeOlxController.index)
routes.post('/promobit', ScrapePromobitController.index)

module.exports = routes