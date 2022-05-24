//Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Data = require ('./models/data');

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






//I
app.get('/home' , (req,res) => {
      Data.find({}, (error, allData) => {
            res.render('index.ejs' , {
                  Data: allData
            })})});


//N
app.get('/home/new' , (req,res) => {
      res.render('new.ejs');
})
//D
//U
//C
app.post('/home' , (req,res) => {
      Data.create(req.body, (error, createdData) => {
            res.redirect('/home')
      })});

//E
//S
app.get('/home/:id' , (req,res) => {
      Data.findById(req.params.id, (err, foundData) => {
            res.render('show.ejs' , {
                  Data: foundData
            })})});













//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));