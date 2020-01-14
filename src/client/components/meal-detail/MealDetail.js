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

// Used to buffer ingredient table updates
let timeoutHandler;

class MealDetail extends Component {
  static handleBuffer = (func) => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      timeoutHandler = null;
      func();
    }, 250);
  };

  static convertIngredientsText = text => text.split(',').map(x => x.trim()).filter(x => x)

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      editable: false,
      saveValid: { nameValid: true, servingsValid: true, mealTimeValid: true },
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
      setTimeout(() => this.setState({ loading: false }), 250);
    });
  }

  setMeal(meal) {
    this.setState({
      meal,
      editable: false,
      saveValid: { nameValid: true, servingsValid: true, mealTimeValid: true },
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

  handleNameChange = (event) => {
    const { value } = event.target;
    this.setState({ name: value });
    this.updateSaveValid({ nameValid: value && value.trim().length > 0 });
  };

  handleServingsChange = (event) => {
    const { value } = event.target;
    const num = +value;
    const isValid = Number.isInteger(num) && num >= 1 && num <= 7;
    this.setState({ servings: value, servingsError: !isValid });
    this.updateSaveValid({ servingsValid: isValid });
  };

  handleIngredientsChange = (event) => {
    const { value } = event.target;
    this.setState({ ingredientsText: value });
    this.constructor.handleBuffer(
      () => this.setState({ ingredients: this.constructor.convertIngredientsText(value) })
    );
  };

  handleMealTimeChange = time => (event) => {
    const { editable, mealTime } = this.state;
    const value = { ...mealTime, [time]: event.target.checked };
    if (!editable) return;
    this.setState({ mealTime: value });
    this.updateSaveValid({ mealTimeValid: value.breakfast || value.lunch || value.dinner });
  };

  updateSaveValid(update) {
    const { saveValid } = this.state;
    this.setState({ saveValid: Object.assign({ ...saveValid }, update) });
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
      loading,
      editable,
      saveValid,
      name,
      servings,
      servingsError,
      mealTime,
      ingredients,
      ingredientsText
    } = this.state;
    const { breakfast, lunch, dinner } = mealTime;
    const { nameValid, servingsValid, mealTimeValid } = saveValid;

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
          <div className="detail-content-wrapper">
            <div className="loading-wrapper" style={{ display: loading ? 'flex' : 'none' }}>
              <CircularProgress className="loading-indicator" color="secondary" />
            </div>
            <TextField
              label="Name"
              value={name}
              className="detail-input"
              margin="dense"
              onChange={this.handleNameChange}
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
              onChange={this.handleServingsChange}
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
              onChange={this.handleIngredientsChange}
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
                          onChange={this.handleMealTimeChange('breakfast')}
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
                          onChange={this.handleMealTimeChange('lunch')}
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
                          onChange={this.handleMealTimeChange('dinner')}
                        />
                    )}
                    />
                  </FormGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="detail-action-wrapper">
            <Button color="secondary">Delete</Button>
            <Button color="default" onClick={() => this.toggleEdit()}>{editable ? 'Cancel' : 'Edit'}</Button>
            <Button color="primary" disabled={!(editable && nameValid && servingsValid && mealTimeValid)}>Save</Button>
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
