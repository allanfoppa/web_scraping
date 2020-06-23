const express = require('express')
const routes = express.Router()

const ScrapPromobitController = require('./controllers/ScrapPromobitController')
const BooksToScrapeController = require('./controllers/BooksToScrapeController')

// UTILIZADO PARA FAZER O LOGIN DA APLICAÇÃO
routes.post('/promobit', ScrapPromobitController.index)
routes.post('/books', BooksToScrapeController.index)

module.exports = routes