//------requirements and dependencies---------//
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()

//redux dependencies
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
//variables
const port = 3000

//--------MIDDLEWARE-------------//
//body parser extracts the entire body portion of an incoming request
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
//redux middleware
const compilier = webpack(config)
app.use(webpackDevMiddleware(compilier, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compilier))
//root endpoint

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  //listeners
app.listen(port, () => {
    console.log(`The app is listening on port ${port}.`)
})

//setting http requests for project_administrators table
app.get('/projadmin', db.getProjAdmin)
app.get('/projadmin/:id', db.getProjAdminById)
app.post('/projadmin/', db.CreateProjAdmin)
app.put('/projadmin/:id', db.updateProjAdmin)
app.delete('/projadmin/:id', db.deleteProjAdmin)
