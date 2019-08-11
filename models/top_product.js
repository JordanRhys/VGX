var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./product');

var TopProductsSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
});

module.exports = mongoose.model('TopProducts', TopProductsSchema);