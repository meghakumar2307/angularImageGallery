var mongoose = require('mongoose');
 
var gallerySchema = new mongoose.Schema({
    title: String,
    tags: String,
    description: String,
    fileSource: String
});
 
//Gallery is a model which has a schema gallerySchema
module.exports = new mongoose.model('Gallery', gallerySchema);
