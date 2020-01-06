import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import WbSunnyIcon from '@material-ui/icons/WbSunny'; // placeholder
import { getMealPlan } from '../../services/MealService';
import MealRow from './MealRow';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    // hide when meals is null, and/or make tiles gray when empty (to avoid click)
    this.state = { meals: new Array(7).fill({ breakfast: {}, lunch: {}, dinner: {} }), loading: false };
  }

  generateMeals() {
    this.setState({ loading: true });

    getMealPlan().then(
      (res) => {
        this.setState({ meals: res, loading: false });
      },
      (err) => {
        console.log(err);
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const { meals, loading } = this.state;

    return (
      <Container className="home-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => this.generateMeals()}
              startIcon={<CachedIcon />}
            >
              Generate
            </Button>
            <Button color="primary" variant="contained" size="large" onClick={rightcb} startIcon={<RestaurantIcon />}>
              View Meals
            </Button>
          </div>
          <div className="grid-wrapper">
            <div className="loading-wrapper" style={{ display: loading ? 'flex' : 'none' }}>
              <CircularProgress className="loading-indicator" color="secondary" />
            </div>
            <Grid container spacing={2}>
              <Grid container item xs={12} spacing={2} justify="center">
                <Grid item xs={1} />
                <Grid item xs={3}>
                  <WbSunnyIcon color="secondary" />
                </Grid>
                <Grid item xs={3}>
                  <WbSunnyIcon color="secondary" />
                </Grid>
                <Grid item xs={3}>
                  <WbSunnyIcon color="secondary" />
                </Grid>
                <Grid item xs={1} />
              </Grid>
              <MealRow day="M" meals={meals[0]} onMealClick={leftcb} />
              <MealRow day="T" meals={meals[1]} onMealClick={leftcb} />
              <MealRow day="W" meals={meals[2]} onMealClick={leftcb} />
              <MealRow day="T" meals={meals[3]} onMealClick={leftcb} />
              <MealRow day="F" meals={meals[4]} onMealClick={leftcb} />
              <MealRow day="S" meals={meals[5]} onMealClick={leftcb} />
              <MealRow day="S" meals={meals[6]} onMealClick={leftcb} />
            </Grid>
          </div>
        </Paper>
      </Container>
    );
  }
}

Home.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default Home;
