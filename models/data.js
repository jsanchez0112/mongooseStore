const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: String,
  img: String,
  price: {type: Number, required: true},
  qty: Number
});
const Data = mongoose.model('Data' , dataSchema);
module.exports = Data;