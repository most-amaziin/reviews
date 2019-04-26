/* eslint-disable func-names */
/* eslint-disable no-console */
const { Client } = require('pg');
const queries = require('./queries.js');

const client = new Client({
  // host: 'localhost',
  // port: 5432,
  user: 'Maggie',
  database: 'sdc',
  password: 'mypassword',
});

client.connect()
  .then((suc) => {
    console.log('Success on connecting to the database');
  })
  .catch((err) => {
    console.log('Error connection to database. ', err);
  });

// const selectAllReviews = function () {
//   return new Promise((resolve, reject) => {
//     client.query('select * from reviews', (err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(res);
//       }
//     });
//   });
// };

const selectReviewsByID = function (id,cb) {

  client.query(`select * from reviews where product_id = '${String(id)}'`, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
};

//   return new Promise((resolve, reject) => {
//     client.query(queries.selectReviewsById(id), (err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(res);
//       }
//     });
//   });
// };

// const selectReviewsByName = function (name) {
//   return new Promise((resolve, reject) => {
//     client.query(queries.selectReviewsByProdName(name), (err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(res);
//       }
//     });
//   });
// };

// const selectUserByName = function (name) {
//   return new Promise((resolve, reject) => {
//     client.query(queries.selectUserByName(name), (err, res) => {
//       if (err && err.code !== 42703) {
//         reject(err);
//       } else if (err && err.code !== 42703) {
//         // this will execute if no user is found
//         // console.log('Did not find user...');
//         resolve([]);
//       } else {
//         // console.log('Found user!', res);
//         resolve(res.rows);
//       }
//     });
//   });
// };

const createReview = function (reviewObj) {
  return new Promise((resolve, reject) => {
    client.query(queries.insertReview(reviewObj), (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

// const createUserAndReview = function (reviewObj, userObj) {
//   return new Promise((resolve, reject) => {
//     client.query(queries.insertUser(userObj), (errUser) => {
//       if (errUser) {
//         reject(errUser);
//         return;
//       }

//       client.query(queries.selectUserByName(userObj.name), (errId, resId) => {
//         if (errId) reject(errId);
//         reviewObj.user_id = resId.rows[0].id;
//         client.query(queries.insertReview(reviewObj), (err, res) => {
//           if (err) reject(err);

//           resolve(res);
//         });
//       });
//     });
//   });
// }

module.exports = {
  // selectAllReviews,
  selectReviewsByID,
  // selectReviewsByName,
  // selectUserByName,
  createReview,
  // createUserAndReview,
};
