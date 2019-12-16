import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Paper } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Meal from '../../types/Meal';
import './MealDetail.scss';

class MealDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {}; // maybe remove?
  }

  render() {
    const { meal, rightcb, leftcb } = this.props;
    return (
      <Container className="meal-detail-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button color="primary" variant="contained" size="large" onClick={leftcb} startIcon={<FastfoodIcon />}>
              Meal List
            </Button>
            <Button color="primary" variant="contained" size="large" onClick={rightcb} startIcon={<HomeIcon />}>
              Home
            </Button>
          </div>
          <p>{meal.id}</p>
          <p>{meal.name}</p>
          <p>{meal.servings}</p>
        </Paper>
      </Container>
    );
  }
}

MealDetail.propTypes = {
  meal: Meal.isRequired,
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default MealDetail;
