const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { selectAllReviews, selectReviewsByID, selectUserByName } = require('./database');

app.use(morgan('dev'));
app.use(bodyParser.json());
dotenv.config();

const port = process.env.PORT;

app.get('/api/reviews', (req, res) => {
  let userID = req.headers.id;
  if (!userID){
    res.statusCode(400);
    res.send();
  }
  selectReviewsByID(userID).then((data) => {
    console.log('sending: ', data);
    res.send(data);
  })
  .catch(err => {
    console.err(err);
    res.send();
  });
})

app.post('/api/reviews', (req, res) => {
  if(!req.body.review){
    res.statusCode(400);
    res.send();
  }
  selectUserByName(req.body.review.name)
  .then(data => {
    console.log('User Data: ', data);
    res.send(data);
  })
  .catch(err => {
    console.error('Error in reviews POST ',  err);
    res.end();
  })
})
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening on port ${port}`));