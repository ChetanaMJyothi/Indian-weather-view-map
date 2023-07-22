const mongoose = require('mongoose'); 

const stateSchema = new mongoose.Schema({
    stateName: {type: String, requireed: true},
    cityNames: {type: Array, required: true},

}) 
module.exports = mongoose.model('indias', stateSchema);