const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
app.use(cookieParser())
const port = process.env.PORT || 8888
//init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//init db
dbConnect()

//init routes
initRoutes(app)
//listen
app.listen(port, () => {
  console.log(`Server on ${port}`)
})
