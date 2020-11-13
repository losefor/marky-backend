const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

/* setup the env variables 
============================== */
require('dotenv').config({
    path:'./config.env',
})

app.use(cors())
app.use(morgan('dev'))

/* connecting to the mongodb
==================================*/ 
mongoose.connect(process.env.DB,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
} ,  (err)=>{
  if (err){
      console.log(err)
  }else{
      console.log('connected to the database')
  }
})



/*importing models
=============================*/ 
require('./models/departmentsModel')
require('./models/studentsModel')
require('./models/usersModel')


/*checking the routes for development
=======================================*/ 
require('morgan')('dev')

/*Middlewares
======================*/
app.use(express.json()) 

/* routes 
========================================== */
require('./routes/studentRoutes')(app) // students routes
require('./routes/userRoutes')(app) // users routes

/* starting the server by listening to port that provided
========================================================== */
const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`server started on port:${PORT}`)
})