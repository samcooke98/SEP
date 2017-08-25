var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamName: {type: 'String', required:true}, 
    description: {type: 'String', required:false}, 
    category: {type: 'String', required:false},
    status: {type: 'String', required:false},
    creationDate: {type: 'Date', default: Date.now},

});



module.exports = mongoose.model('Team', teamSchema);





