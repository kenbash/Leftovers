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
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import SunriseIcon from '../../assets/SunriseIcon';
import { getMealPlan } from '../../services/MealService';
import MealRow from './MealRow';
import IngredientList from './IngredientList';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: new Array(7).fill({ breakfast: null, lunch: null, dinner: null }),
      ingredients: [],
      loading: false
    };
  }

  generateMeals = () => {
    this.setState({ loading: true });

    getMealPlan().then(
      (res) => {
        const { meals, ingredients } = res;
        this.setState({ meals, ingredients, loading: false });
      },
      (err) => {
        console.log(err);
        // toast msg
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const { meals, ingredients, loading } = this.state;

    return (
      <Container className="home-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={this.generateMeals}
              startIcon={<CachedIcon />}
            >
              Generate
            </Button>
            <Button color="primary" variant="contained" size="large" onClick={rightcb} startIcon={<RestaurantIcon />}>
              View Meals
            </Button>
          </div>
          <div className="grid-wrapper">
            <div className="loading-wrapper" style={loading ? null : { display: 'none' }}>
              <CircularProgress className="loading-indicator" color="secondary" />
            </div>
            <Grid container spacing={2}>
              <Grid container item xs={12} spacing={2} justify="center">
                <Grid item xs={1} />
                <Grid item xs={3}>
                  <SunriseIcon color="secondary" />
                </Grid>
                <Grid item xs={3}>
                  <WbSunnyIcon color="secondary" />
                </Grid>
                <Grid item xs={3}>
                  <Brightness3Icon color="secondary" />
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
          <IngredientList rows={ingredients} />
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
