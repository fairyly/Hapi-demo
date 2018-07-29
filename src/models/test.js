
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demoModel = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  age: { type: Number, required: true }
});

module.exports = mongoose.model('Demo', demoModel, 'demos'); 