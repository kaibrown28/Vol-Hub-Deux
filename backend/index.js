//requirements
const express = require('express')
const bodyParser = require('body-parser')
//
const app = express()
//variables
const port = 3000

//middleware
//body parser extracts the entire body portion of an incoming request
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)

//root endpoint
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  //listeners
app.listen(port, () => {
    console.log(`The app is listening on port ${port}.`)
})