import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getReviewsByID, postReview, getReviewsByName } from './dataHelpers';
import ReviewList from './components/reviews/reviewList.jsx';
import AddReview from './components/addReview/addReview.jsx';
import BarChart from './components/barchart/barchart.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProdID: 1,
      reviews: [],
      reviewsPerPage: 10,
      page: 1,
    };

    window.addEventListener('updateProdId', this.handleUpdateProdId.bind(this));

    this.fetchData = this.fetchData.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleNextOrPrev = this.handleNextOrPrev.bind(this);
  }

  componentDidMount() {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const id = params.get('id') || null;
    const product = params.get('product') || null;
    this.fetchData(id, product);
  }

  fetchData(id, product) {
    console.log('CLIENT: type and id in fetchData:', id + typeof id);
    if (id) {
      getReviewsByID(id)
        .then((data) => {
          this.setState({ reviews: data.rows, currentProdID: id, page: 1 });
        });
    } else if (product) {
      getReviewsByName(product)
        .then((data) => {
          this.setState({ reviews: data.rows });
        });
    } else {
      getReviewsByID(3424050)
        .then((data) => {
          this.setState({ reviews: data.rows });
        });
    }
  }

  handleUpdateProdId(e) {
    this.fetchData(e.detail, null);
  }

  handleReviewSubmit(review) {
    const { currentProdID } = this.state;
    const newReview = { ...review };
    console.log('newReview:', newReview);
    newReview.review.product_id = currentProdID;

    postReview(newReview)
      .then(() => {
        this.fetchData(currentProdID);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleNextOrPrev(direction) {
    const { page } = this.state;
    if (direction === 'next') {
      this.setState({ page: page + 1 });
    }
    else if (direction === 'prev') {
      if (page === 1) { return null; }

      this.setState({ page: page - 1 });
    }
  }

  render() {
    const { reviews, reviewsPerPage, page } = this.state;
    return (
      <Container>
        <Row>
          <Col md={4}>
            <BarChart reviews={reviews} />
          </Col>
          <Col md={8}>
            <AddReview
              handleSubmit={this.handleReviewSubmit}
            />
            <ReviewList reviews={reviews}
                        reviewsPerPage={reviewsPerPage}
                        page={page}
                        handleNextOrPrev={this.handleNextOrPrev}
                        />
          </Col>
        </Row>
      </Container>
    );
  }
}
//window.reviews = App;
ReactDOM.render(<App />, document.getElementById('reviews'));
