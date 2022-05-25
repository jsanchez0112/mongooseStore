//require dependecies
const express = require('express');
const Data = require ('../models/data')
const router = express.Router();


//Index
router.get('/' , (req,res) => {
      Data.find({}, (error, allData) => {
            res.render('index.ejs' , {
                  Data: allData
            })})});


//New
router.get('/new' , (req,res) => {
      res.render('new.ejs');
})
//Delete
router.delete('/:id' , (req,res) => {
      Data.findByIdAndRemove(req.params.id, (err, data) => {
            res.redirect('/home')
      });})

//Update
router.put('/:id' , (req,res) => { 
      Data.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                  new:true,
            },
            (error, updatedData) => {
                  res.redirect(`/home/${req.params.id}`)
            })})

// router.put('/:id/buy' , (req,res) => {
//       Data.findByIdAndUpdate(
//             req.params.qty,
//             red.body,
//             {
//                   new: true,
//             },
//             (error, updateQty) => {
//                   updateQty.qty -1;
//                   updateQty.savve();
//                   res.redirect(`/home/${req.params.qty}`)
//             })});


router.post('/' , (req,res) => {
      Data.create(req.body, (error, createdData) => {
            res.redirect('/home')
            
      })});

//Edit
router.get('/:id/edit' , (req,res) => {
      Data.findById(req.params.id, (error, foundData)=> {
            res.render('edit.ejs' , {
                  Data: foundData
            });});})


//Show
router.get('/:id' , (req,res) => {
      Data.findById(req.params.id, (err, foundData) => {
            res.render('show.ejs' , {
                  Data: foundData
            })})});


module.exports = router;