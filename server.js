const express = require('express')
const mongoose = require('mongoose')
const color = require('colors')
const dotenv = require("dotenv");
dotenv.config();

const path = require("path")
const cors = require('cors')
const auth = require('./lib/auth.js')

// connect the database
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
      })
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch(error) {
      console.error(`Error: ${error.message}`.red.underline.bold)
      process.exit(1)
    }
  }
  
connectDB()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: `here's process.env.NODE_ENV: ${process.env.NODE_ENV}` })
})

// register passport authentication middlewar
app.use(auth)


let port = process.env.PORT || 5000

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold))