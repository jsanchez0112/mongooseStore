//Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Data = require ('./models/data');
const methodOverride = require('method-override');
const { populate } = require('./models/data.js');
const { redirect } = require('express/lib/response');

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





//Index
app.get('/home' , (req,res) => {
      Data.find({}, (error, allData) => {
            res.render('index.ejs' , {
                  Data: allData
            })})});


//New
app.get('/home/new' , (req,res) => {
      res.render('new.ejs');
})
//Delete
app.delete('/home/:id' , (req,res) => {
      Data.findByIdAndRemove(req.params.id, (err, data) => {
            res.redirect('/home')
      });})

//Update
app.put('/home/:id' , (req,res) => { 
      Data.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                  new:true,
            },
            (error, updatedData) => {
                  res.redirect(`/home/${req.params.id}`)
            })})

app.post('/home' , (req,res) => {
      Data.create(req.body, (error, createdData) => {
            res.redirect('/home')
            
      })});

//Edit
app.get('/home/:id/edit' , (req,res) => {
      Data.findById(req.params.id, (error, foundData)=> {
            res.render('edit.ejs' , {
                  Data: foundData
            });});})


//Show
app.get('/home/:id' , (req,res) => {
      Data.findById(req.params.id, (err, foundData) => {
            res.render('show.ejs' , {
                  Data: foundData
            })})});













//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));