var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imageUploadGallery', {useNewUrlParser: true}); 
// I use environment file instead of direct mongoURL
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;