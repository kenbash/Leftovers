import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from '@material-ui/core';
import './MealDetail.scss';

class MealDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { rightcb, leftcb } = this.props;
    return (
      <Container className="meal-detail-wrapper">
        <div className="button-wrapper">
          <Button color="primary" variant="contained" size="large" onClick={leftcb}>
            Meal List
          </Button>
          <Button color="primary" variant="contained" size="large" onClick={rightcb}>
            Home
          </Button>
        </div>
        <h1>Meal Detail</h1>
      </Container>
    );
  }
}

MealDetail.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default MealDetail;
