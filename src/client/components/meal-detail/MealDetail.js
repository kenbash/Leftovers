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
import { onMealDetailChange, updateMeal, deleteMeal } from '../../services/MealService';
import './MealDetail.scss';

// Used to buffer ingredient table updates
let timeoutHandler;

// TODO: extract ingredients table & mealtime to separate components
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
    // toast msg if meal null, better soln than ternaries?

    this.setState({
      meal,
      editable: false,
      saveValid: { nameValid: true, servingsValid: true, mealTimeValid: true },
      name: meal ? meal.name : '',
      servings: meal ? meal.servings : '',
      servingsError: false,
      mealTime: {
        breakfast: meal ? meal.breakfast : false,
        lunch: meal ? meal.lunch : false,
        dinner: meal ? meal.dinner : false
      },
      ingredients: meal ? meal.ingredients : [],
      ingredientsText: meal ? meal.ingredients.join(', ') : ''
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

  handleSave() {
    const {
      meal,
      name,
      servings,
      mealTime,
      ingredientsText,
      saveValid,
      editable
    } = this.state;
    const { nameValid, servingsValid, mealTimeValid } = saveValid;

    if (!(meal && editable && nameValid && servingsValid && mealTimeValid)) return;

    const { breakfast, lunch, dinner } = mealTime;
    const mealUpdate = {
      name,
      servings,
      breakfast,
      lunch,
      dinner,
      ingredients: this.constructor.convertIngredientsText(ingredientsText)
    };
    this.setState({ editable: false, loading: true });

    updateMeal(meal.id, JSON.stringify(mealUpdate)).then(
      () => this.setState({ loading: false }),
      (err) => {
        console.error(err);
        this.setState({ loading: false });
        // toast msg
      }
    );
  }

  handleDelete() {
    const { rightcb } = this.props;
    const { meal } = this.state;
    if (!meal) return;

    this.setState({ editable: false, loading: true });

    deleteMeal(meal.id).then(
      () => {
        this.setState({ loading: false });
        rightcb();
      },
      (err) => {
        console.error(err);
        this.setState({ loading: false });
        // toast msg
      }
    );
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const {
      loading,
      meal,
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
            <div className="loading-wrapper" style={loading ? null : { display: 'none' }}>
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
            <Button
              color="secondary"
              disabled={!meal || loading}
              onClick={() => this.handleDelete()}
            >
              Delete
            </Button>
            <Button
              color="default"
              disabled={!meal || loading}
              onClick={() => this.toggleEdit()}
            >
              {editable ? 'Cancel' : 'Edit'}
            </Button>
            <Button
              color="primary"
              disabled={!(meal && editable && nameValid && servingsValid && mealTimeValid)}
              onClick={() => this.handleSave()}
            >
              Save
            </Button>
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
