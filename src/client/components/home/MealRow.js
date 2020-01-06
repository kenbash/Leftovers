import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import MealName from '../../types/Meal';

function MealRow(props) {
  const { day, meals, onMealClick } = props;

  return (
    <Grid container item xs={12} spacing={2} alignItems="center" justify="center">
      <Grid item xs={1}>
        <Typography variant="h6" align="center">
          {day}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className="meal-cell" onClick={() => onMealClick(meals.breakfast)}>
          {meals.breakfast.name}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className="meal-cell" onClick={() => onMealClick(meals.lunch)}>
          {meals.lunch.name}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className="meal-cell" onClick={() => onMealClick(meals.dinner)}>
          {meals.dinner.name}
        </Paper>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}

MealRow.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.shape({ breakfast: MealName, lunch: MealName, dinner: MealName }).isRequired,
  onMealClick: PropTypes.func.isRequired
};

export default MealRow;
