import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Container, Grid, Paper, Typography 
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { meals: new Array(7).fill({ breakfast: null, lunch: null, dinner: null }) };
  }

  generateMeals() {
    this.setState({
      meals: [
        {
          breakfast: 'one',
          lunch: 'two',
          dinner: 'three'
        },
        {
          breakfast: 'one',
          lunch: 'two',
          dinner: 'three'
        },
        {
          breakfast: 'one',
          lunch: 'two',
          dinner: 'three'
        },
        {
          breakfast: 'one',
          lunch: 'two',
          dinner: 'three'
        },
        {
          breakfast: 'one',
          lunch: 'two',
          dinner: 'three'
        },
        {
          breakfast: 'one',
          lunch: 'two',
          dinner: 'three'
        },
        {
          breakfast: 'one',
          lunch: 'two',
          dinner: 'three'
        }
      ]
    });
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const { meals } = this.state;

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
            <Button color="primary" variant="contained" size="large" onClick={rightcb} startIcon={<FastfoodIcon />}>
              View Meals
            </Button>
          </div>
          <div className="grid-wrapper">
            <Grid container spacing={2}>
              <Grid container item xs={12} spacing={2} justify="center">
                <Grid item xs={1} />
                <Grid item xs={3}>
                  Sunrise
                </Grid>
                <Grid item xs={3}>
                  Midday
                </Grid>
                <Grid item xs={3}>
                  Sunset
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

const MealRow = (props) => {
  const { day, meals, onMealClick } = props;
  return (
    <Grid container item xs={12} spacing={2} alignItems="center" justify="center">
      <Grid item xs={1}>
        <Typography variant="h6" align="center">
          {day}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className="meal-cell" onClick={onMealClick}>
          {meals.breakfast}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className="meal-cell" onClick={onMealClick}>
          {meals.lunch}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className="meal-cell" onClick={onMealClick}>
          {meals.dinner}
        </Paper>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

MealRow.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.shape({ breakfast: PropTypes.string, lunch: PropTypes.string, dinner: PropTypes.string }).isRequired,
  onMealClick: PropTypes.func.isRequired
};

Home.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default Home;
