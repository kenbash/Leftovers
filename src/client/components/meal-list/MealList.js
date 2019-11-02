import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from '@material-ui/core';
import './MealList.scss';

class MealList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rightcb, leftcb } = this.props;
    return (
      <Container className="meal-list-wrapper">
        <div className="button-wrapper">
          <Button color="primary" variant="contained" size="large" onClick={leftcb}>
            Home
          </Button>
        </div>
        <h1>Meal List</h1>
        <Button size="small" onClick={rightcb}>
          go to details
        </Button>
      </Container>
    );
  }
}

MealList.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default MealList;
