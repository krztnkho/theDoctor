var mongoose = require('mongoose'),
    Schema= mongoose.Schema;

var knowledgeBase_Schema = new Schema({
		input: String,
		responses: [String]		
});

module.exports = mongoose.model('knowledgeBase',knowledgeBase_Schema,'knowledgebase');


