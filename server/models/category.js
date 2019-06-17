var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, required: true, min: 4, max: 100}
});

CategorySchema
    .virtual('spaceless_name')
    .get(function() {
        var split = this.name.split(" ")
        var joined = split.join("")
        return joined
    })

module.exports = mongoose.model('Category', CategorySchema);