import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField
} from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny'; // placeholder

function MealDialog(props) {
  const { open, onClose, onSave } = props;

  const [name, setName] = React.useState('');
  const [servings, setServings] = React.useState('');
  const [servingsError, setServingsError] = React.useState(false);
  const [mealTime, setMealTime] = React.useState({ breakfast: false, lunch: false, dinner: false });
  const [saveValid, setSaveValid] = React.useState({ nameValid: false, servingsValid: false, mealTimeValid: false });

  const updateSaveValid = (update) => {
    setSaveValid(Object.assign({ ...saveValid }, update));
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    updateSaveValid({ nameValid: value && value.trim().length > 0 });
  };

  const handleServingsChange = (event) => {
    const num = +event.target.value;
    const isValid = Number.isInteger(num) && num >= 1 && num <= 21;
    setServings(event.target.value);
    setServingsError(!isValid);
    updateSaveValid({ servingsValid: isValid });
  };

  const handleMealTimeChange = time => (event) => {
    const value = { ...mealTime, [time]: event.target.checked };
    setMealTime(value);
    updateSaveValid({ mealTimeValid: value.breakfast || value.lunch || value.dinner });
  };

  const handleClose = () => {
    onClose();

    // Reset state
    setName('');
    setServings('');
    setServingsError(false);
    setMealTime({ breakfast: false, lunch: false, dinner: false });
    setSaveValid({ nameValid: false, servingsValid: false, mealTimeValid: false });
  };

  const { breakfast, lunch, dinner } = mealTime;
  const { nameValid, servingsValid, mealTimeValid } = saveValid;

  const handleSave = () => {
    if (nameValid && servingsValid && mealTimeValid) {
      onSave({
        name: name.trim(),
        servings: +servings,
        breakfast,
        lunch,
        dinner
      });
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="meal-dialog-title">Add Meal</DialogTitle>
      <DialogContent id="meal-dialog-content">
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          margin="dense"
          fullWidth
          autoFocus
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          label="Servings"
          value={servings}
          onChange={handleServingsChange}
          margin="dense"
          type="number"
          fullWidth
          inputProps={{ min: 1, max: 21 }}
          error={servingsError}
          helperText={servingsError ? 'Servings must be an integer from 1 to 21' : ''}
        />
        <div className="meal-time-icons">
          <WbSunnyIcon />
          <WbSunnyIcon />
          <WbSunnyIcon />
        </div>
        <FormControl id="meal-time-control" component="fieldset">
          <FormGroup id="meal-time-group" row>
            <FormControlLabel
              className="meal-time-checkbox"
              control={(
                <Checkbox
                  color="primary"
                  value="breakfast"
                  checked={breakfast}
                  onChange={handleMealTimeChange('breakfast')}
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
                  onChange={handleMealTimeChange('lunch')}
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
                  onChange={handleMealTimeChange('dinner')}
                />
              )}
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!(nameValid && servingsValid && mealTimeValid)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MealDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default MealDialog;
