import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ReadOnlyAlert from '../../assets/ReadOnlyAlert';
import {
  deleteMeal,
  onMealDetailChange,
  updateMeal,
  updateMealList
} from '../../services/MealService';
import { onLoginChange } from '../../services/UserService';
import { sendSnackbar } from '../../services/SnackbarService';
import IngredientTable from './IngredientTable';
import MealTimeSelector from './MealTimeSelector';
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
      servings: '',
      servingsError: false,
      mealTime: { breakfast: false, lunch: false, dinner: false },
      ingredients: [],
      ingredientsText: '',
    };
  }

  componentDidMount() {
    onMealDetailChange('loading', () => this.setState({ loading: true }));

    onMealDetailChange('change', (meal) => {
      this.setMeal(meal);
      setTimeout(() => {
        if (!meal) sendSnackbar({ type: 'error', title: 'Error', text: 'Meal not found' });
        this.setState({ loading: false });
      }, 250);
    });

    onLoginChange(() => {
      const { meal } = this.state;
      if (meal) {
        const { rightcb } = this.props;
        rightcb();
      }
    });
  }

  setMeal(meal) {
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

  handleNavigation = navcb => () => {
    this.setState({ meal: null });
    navcb();
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
      () => {
        mealUpdate.id = meal.id;
        updateMealList('edit', mealUpdate);
        sendSnackbar({ type: 'success', title: 'Success', text: 'Meal saved' });
        this.setState({ meal: mealUpdate, loading: false });
      },
      () => {
        sendSnackbar({ type: 'error', title: 'Error', text: 'Failed to save meal' });
        this.setState({ loading: false });
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
        updateMealList('delete', meal);
        sendSnackbar({ type: 'success', title: 'Success', text: 'Meal deleted' });
        this.setState({ loading: false });
        rightcb();
      },
      () => {
        sendSnackbar({ type: 'error', title: 'Error', text: 'Failed to delete meal' });
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { rightcb, leftcb, loggedIn } = this.props;
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
    const { nameValid, servingsValid, mealTimeValid } = saveValid;

    return (
      <Container className="meal-detail-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button color="primary" variant="contained" size="large" onClick={this.handleNavigation(leftcb)} startIcon={<RestaurantIcon />}>
              Meals
            </Button>
            <Button color="primary" variant="contained" size="large" onClick={this.handleNavigation(rightcb)} startIcon={<HomeIcon />}>
              Home
            </Button>
          </div>
          {loggedIn ? null : <ReadOnlyAlert />}
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
              <IngredientTable rows={ingredients} />
              <MealTimeSelector mealTime={mealTime} handleChange={this.handleMealTimeChange} />
            </div>
          </div>
          <div className="detail-action-wrapper">
            <Button
              color="secondary"
              disabled={!meal || !loggedIn || loading}
              onClick={() => this.handleDelete()}
            >
              Delete
            </Button>
            <Button
              color="default"
              disabled={!meal || !loggedIn || loading}
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
  leftcb: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default MealDetail;
