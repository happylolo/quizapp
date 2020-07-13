const express = require('express');
const bodyParser = require('body-parser');
const createSurvey = require('./database/controllers/survey');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../frontend/build', { index: 'index.html' }));

app.post('/api/submit', (req, res) => {
  createSurvey(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err));
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
