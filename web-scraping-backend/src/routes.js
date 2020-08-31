const express = require('express')
const routes = express.Router()

const BooksToScrapeController = require('./controllers/BooksToScrapeController')
const ScrapeOlxController = require('./controllers/ScrapeOlxController')
const ScrapeCarrefourController = require('./controllers/ScrapeCarrefourController')
const ScrapePromobitController = require('./controllers/ScrapePromobitController')

routes.post('/books', BooksToScrapeController.index)
routes.post('/carrefour', ScrapeCarrefourController.index)
routes.post('/olx', ScrapeOlxController.index)
routes.post('/promobit', ScrapePromobitController.index)

module.exports = routes