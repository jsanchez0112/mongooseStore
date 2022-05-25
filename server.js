//Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
// const Data = require ('./models/data');
const methodOverride = require('method-override');
const dataController = require('./controllers/data')
// const { populate } = require('./models/data.js');
// const { redirect } = require('express/lib/response');

//Database Connection
mongoose.connect(process.env.DATABASE_URL, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
});

//Database connection Error/Success
//Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected' , () => console.log('mongo disconnected'));

//middleware
//body parser middleware: give us access to req.body
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

//controllers 
app.use('/home' , dataController)















//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));