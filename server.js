const express = require('express')
const mongoose = require('mongoose')
const color = require('colors')
const dotenv = require("dotenv");
dotenv.config();

const path = require("path")
const cors = require('cors')
const auth = require('./lib/auth.js')
const bodyParser    = require('body-parser')

//get routes 
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const sectionRoutes = require('./routes/sectionRoutes')
const lessonRoutes = require('./routes/lessonRoutes')
const videoRoutes = require('./routes/videoRoutes')

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
  
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: `here's process.env.NODE_ENV: ${process.env.NODE_ENV}` })
})

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers", "application/x-www-form-urlencoded",
//     "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   )
//   next();
// });

// register passport authentication middlewar
app.use(auth);
app.use(userRoutes);
app.use(courseRoutes);
app.use(sectionRoutes);
app.use(lessonRoutes);
app.use(videoRoutes);

let port = process.env.PORT || 5000

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold))