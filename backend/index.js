//requirements
const express = require('express')
const bodyParser = require('body-parser')
const db = require('.queries')
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

//setting http requests for project_administrators table
app.get('/projadmin', db.getProjAdmin)
app.get('/projadmin/:id', db.getProjAdminById)
app.post('/projadmin/:id', db.CreateProjAdmin)
app.put('/users/:id', db.updateUser)
app.delete('/projadmin/:id', db.deleteProjAdmin)
