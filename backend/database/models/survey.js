const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
  email: {type: String, required: true },
  answers: [String]
})

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
