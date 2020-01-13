/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import SunriseIcon from '../../assets/SunriseIcon';
import { onMealDetailChange } from '../../services/MealService';
import './MealDetail.scss';

class MealDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      editable: false,
      meal: null,
      name: '',
      servings: 0,
      servingsError: false,
      mealTime: { breakfast: false, lunch: false, dinner: false },
      ingredients: [],
      ingredientsText: ''
    };
  }

  componentDidMount() {
    onMealDetailChange(() => this.setState({ loading: true }), 'loading');
    onMealDetailChange((meal) => {
      this.setMeal(meal);
      this.setState({ loading: false }); // setTimeout?
    });
  }

  setMeal(meal) {
    this.setState({
      meal,
      editable: false,
      name: meal.name,
      servings: meal.servings,
      servingsError: false,
      mealTime: {
        breakfast: meal.breakfast,
        lunch: meal.lunch,
        dinner: meal.dinner
      },
      ingredients: meal.ingredients,
      ingredientsText: meal.ingredients.join(', ')
    });
  }

  toggleEdit() {
    const { meal, editable } = this.state;

    if (editable) {
      this.setMeal(meal);
    } else {
      this.setState({ editable: !editable });
    }
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const {
      loading, editable, name, servings, servingsError, mealTime, ingredients, ingredientsText
    } = this.state;
    const { breakfast, lunch, dinner } = mealTime;

    return (
      <Container className="meal-detail-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button color="primary" variant="contained" size="large" onClick={leftcb} startIcon={<RestaurantIcon />}>
              Meals
            </Button>
            <Button color="primary" variant="contained" size="large" onClick={rightcb} startIcon={<HomeIcon />}>
              Home
            </Button>
          </div>
          { loading ? <CircularProgress className="loading-indicator" color="secondary" />
            : null}
          <TextField
            label="Name"
            value={name}
            className="detail-input"
            margin="dense"
            // onChange={this.handleNameChange}
            fullWidth
            inputProps={{ maxLength: 100 }}
            InputProps={{
              readOnly: !editable
            }}
            variant="outlined"
          />
          <TextField
            label="Servings"
            value={servings}
            className="detail-input"
            margin="dense"
            // onChange={handleServingsChange}
            type="number"
            fullWidth
            inputProps={{ min: 1, max: 7 }}
            InputProps={{
              readOnly: !editable
            }}
            variant="outlined"
            error={servingsError}
            helperText={servingsError ? 'Servings must be an integer from 1 to 7' : ''}
          />
          <TextField
            label="Ingredients (optional)"
            value={ingredientsText}
            className="detail-input"
            margin="dense"
            // onChange={event => setIngredients(event.target.value)}
            fullWidth
            inputProps={{ maxLength: 250 }}
            InputProps={{
              readOnly: !editable
            }}
            variant="outlined"
            helperText={editable ? 'Enter ingredients as a comma-delimited list' : ''}
          />
          <div className="ingredient-meal-time-wrapper">
            <div className="ingredients-table">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell key="ingredients">
                      Ingredients
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.map((row, i) => (
                    <TableRow
                      tabIndex={-1}
                      key={i}
                      className="meal-row"
                    >
                      <TableCell key="ingredients">
                        {row}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="meal-time-wrapper">
              <div className="meal-time-icons">
                <SunriseIcon />
                <WbSunnyIcon />
                <Brightness3Icon />
              </div>
              <FormControl component="fieldset">
                <FormGroup className="meal-time-group" row>
                  <FormControlLabel
                    className="meal-time-checkbox"
                    control={(
                      <Checkbox
                        color="primary"
                        value="breakfast"
                        checked={breakfast}
                      />
                  )}
                  />
                  <FormControlLabel
                    className="meal-time-checkbox"
                    control={(
                      <Checkbox
                        color="primary"
                        value="lunch"
                        checked={lunch}
                      />
                  )}
                  />
                  <FormControlLabel
                    className="meal-time-checkbox"
                    control={(
                      <Checkbox
                        color="primary"
                        value="dinner"
                        checked={dinner}
                      />
                  )}
                  />
                </FormGroup>
              </FormControl>
            </div>
          </div>
          <div className="detail-action-wrapper">
            <Button color="secondary">Delete</Button>
            <Button color="default" onClick={() => this.toggleEdit()}>{editable ? 'Cancel' : 'Edit'}</Button>
            <Button color="primary">Save</Button>
          </div>
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
