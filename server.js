const express = require('express');
const app = express();
const faker = require('faker');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
  selectReviewsByID,
  // selectReviewsByName,
  // selectUserByName,
  createReview,
  // createUserAndReview,
} = require('./database');

const port = 3333;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/api/reviews', (req, res) => {
  const { id } = req.headers;
  const numberId = Number(id);

  // if (!numberId) {
  //   res.status(400).end();
  // }

  selectReviewsByID(numberId,(err, data) => {
    if (err) {
      res.end();
    } else {
      res.send(data);
    }
  });
  // const reviewPromise = selectReviewsByID(numberId);
  // // let {productid : productID, productname: productName } = req.headers;
  // // if (!productID && !productName) {
  // //   res.status(400);
  // //   res.send();
  // // }
  // // let reviewPromise = (productID) ? selectReviewsByID(productID) : selectReviewsByName(productName);
  // // console.log('numberId:', numberId);
  // reviewPromise.then((data) => {
  //   res.status(200).send(data);
  // })
  // .catch((err) => {
  //   // console.error('Error in GET /api/reviews', err);
  //   res.end();
  // });
});

app.post('/api/reviews', (req, res) => {
  if (!req.body.user) {
    res.status(400);
    res.send();
  }

  let user_id = Math.floor(Math.random() * 100);
  let created_at = faker.date.between('01/01/2019', '04/01/2019');

  const reviewObj = { review, stars, title, product_id } = req.body.review;
  
  reviewObj['user_id'] = user_id;
  reviewObj['created_at'] = created_at;

  createReview(reviewObj)
    .then((data) => {
      console.log('Created review: ', data);
      res.status(201);
      res.send();
    })
    .catch((err) => {
      console.error(err);
      res.send();
    });

  // selectUserByName(req.body.user.name)
  // .then(userArr => {
  //   if(!userArr.length){
  //     let AvatarId = Math.floor(Math.random() * 19);
  //     let userObj = { avatar_id: AvatarId, name: req.body.user.name};
  //     createUserAndReview(reviewObj, userObj)
  //       .then((data) => {
  //         console.log('Created user: ', data);
  //         res.status(201);
  //         res.send();
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         res.send();
  //       })
  //   } else {
  //     console.log('User info', userArr);
  //     reviewObj.user_id = userArr[0].id;
  //     createReview(reviewObj)
  //     .then((data) => {
  //       console.log('Created review: ', data);
  //       res.status(201);
  //       res.send();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.send();
  //     })
  //   }
  //   res.send();
  // })
  // .catch(err => {
  //   console.error('Error in reviews POST ',  err);
  //   res.end();
  // })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
