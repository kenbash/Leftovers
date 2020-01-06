import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Paper } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { onMealDetailChange } from '../../services/MealService';
import './MealDetail.scss';

class MealDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      meal: {}
    };
  }

  componentDidMount() {
    onMealDetailChange(() => this.setState({ loading: true }), 'loading');
    onMealDetailChange(meal => this.setState({ loading: false, meal }));
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const { loading, meal } = this.state;

    return (
      <Container className="meal-detail-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button color="primary" variant="contained" size="large" onClick={leftcb} startIcon={<RestaurantIcon />}>
              Meal List
            </Button>
            <Button color="primary" variant="contained" size="large" onClick={rightcb} startIcon={<HomeIcon />}>
              Home
            </Button>
          </div>
          { loading ? <p>loading</p> : null}
          <p>{meal.name}</p>
          <p>{meal.servings}</p>
          <p>{meal.breakfast ? 'true' : 'false'}</p>
          <p>{meal.lunch ? 'true' : 'false'}</p>
          <p>{meal.dinner ? 'true' : 'false'}</p>
          <p>{meal.ingredients}</p>
        </Paper>
      </Container>
    );
  }
}

MealDetail.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default MealDetail;
