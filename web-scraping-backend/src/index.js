const express = require('express')
const compression = require('compression')
const helmet = require('helmet')

const app = express()
const routes = require('./routes')

// COMPRESS ALL ROUTES
app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(routes)

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (request, response) => {
    response.send('Tudo certo!');
});

let port = process.env.PORT;

if (port == null || port == "") {
    port = 3333;
}

app.listen(port);