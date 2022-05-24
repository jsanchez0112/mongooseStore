//Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const data = require ('./models/data');

//Database Connection
mongoose.connect(process.env.DATABASE_URL,{ 
      useNewUrlParser: true,
      useUnifiedTopology: true
});