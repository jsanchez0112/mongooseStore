const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: String,
  img: String,
  price: {type: number, required: true},
  qty: Number
});
const data = mongoose.model('Book' , dataSchema);
module.exports = data;