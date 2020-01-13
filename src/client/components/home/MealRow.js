import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { MealName } from '../../types/Meal';

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
        { meals.breakfast ? (
          <Paper elevation={3} className="meal-cell" title={meals.breakfast.name} onClick={() => onMealClick(meals.breakfast.id)}>
            {meals.breakfast.name}
          </Paper>
        ) : <Paper elevation={3} className="meal-cell-empty" />
        }
      </Grid>
      <Grid item xs={3}>
        { meals.lunch ? (
          <Paper elevation={3} className="meal-cell" title={meals.lunch.name} onClick={() => onMealClick(meals.lunch.id)}>
            {meals.lunch.name}
          </Paper>
        ) : <Paper elevation={3} className="meal-cell-empty" />
        }
      </Grid>
      <Grid item xs={3}>
        { meals.dinner ? (
          <Paper elevation={3} className="meal-cell" title={meals.dinner.name} onClick={() => onMealClick(meals.dinner.id)}>
            {meals.dinner.name}
          </Paper>
        ) : <Paper elevation={3} className="meal-cell-empty" />
        }
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
