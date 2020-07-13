const db = require('../index.js');
const Survey = require('../models/survey.js');

const createSurvey = surveyData => {
  return Survey.create(surveyData);
};

module.exports = createSurvey;
