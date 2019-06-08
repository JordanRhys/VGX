var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    name: {type: String, required: true, min: 4, max: 100}
});