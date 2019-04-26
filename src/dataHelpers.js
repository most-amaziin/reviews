/* eslint-disable func-names */
import axios from 'axios';

const host = 'http://localhost';
// const host = 'http://ec2-54-224-251-247.compute-1.amazonaws.com';
export const getReviewsByID = function (id) {
  console.log('CLIENT id in getReviewsByID data helper:', id);
  return new Promise((resolve, reject) => {
    axios.get(`${host}:3333/api/reviews`, { headers: { id: id, 'Access-Control-Allow-Origin': '*' } })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// export const getReviewsByName = function (name) {
//   return new Promise((resolve, reject) => {
//     axios.get(`${host}:3000/api/reviews`, { headers: { productname: name, 'Access-Control-Allow-Origin': `${host}:3000/api/reviews` } })
//       .then((data) => {
//         resolve(data.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

export const postReview = function (review) {
  return new Promise((resolve, reject) => {
    axios.post(`${host}:3333/api/reviews`, review)
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
