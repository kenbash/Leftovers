import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  Container,
  Paper
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import SunriseIcon from '../../assets/SunriseIcon';
import { getMealPlan } from '../../services/MealService';
import { sendSnackbar } from '../../services/SnackbarService';
import MealRow from './MealRow';
import IngredientPanel from './IngredientPanel';
import './Home.scss';
import { onLoginChange } from '../../services/UserService';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: new Array(7).fill({}),
      ingredients: [],
      loading: false
    };
  }

  componentDidMount() {
    onLoginChange(() => {
      this.setState({
        meals: new Array(7).fill({}),
        ingredients: []
      });
    });
  }

  generateMeals = () => {
    this.setState({ loading: true });

    getMealPlan().then(
      (res) => {
        const { meals, ingredients } = res;
        this.setState({ meals, ingredients, loading: false });
      },
      () => {
        sendSnackbar({ type: 'error', title: 'Error', text: 'Failed to generate meal plan' });
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
            <SunriseIcon color="secondary" />
            <WbSunnyIcon color="secondary" />
            <Brightness3Icon color="secondary" />
            <MealRow day="M" meals={meals[0]} onMealClick={leftcb} />
            <MealRow day="T" meals={meals[1]} onMealClick={leftcb} />
            <MealRow day="W" meals={meals[2]} onMealClick={leftcb} />
            <MealRow day="T" meals={meals[3]} onMealClick={leftcb} />
            <MealRow day="F" meals={meals[4]} onMealClick={leftcb} />
            <MealRow day="S" meals={meals[5]} onMealClick={leftcb} />
            <MealRow day="S" meals={meals[6]} onMealClick={leftcb} />
          </div>
          <div className="ingredient-list-wrapper">
            <IngredientPanel rows={ingredients} />
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
