var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, required: true, min: 4, max: 100}
});

CategorySchema.index({name: 'text'});

module.exports = mongoose.model('Category', CategorySchema);