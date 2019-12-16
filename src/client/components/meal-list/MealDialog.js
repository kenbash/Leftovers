import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core';
import './MealList.scss';

function MealDialog(props) {
  const { open, onClose, onSave } = props;

  const [name, setName] = React.useState('');
  const [servings, setServings] = React.useState('');
  const [servingsValid, setServingsValid] = React.useState(true);
  const [saveValid, setSaveValid] = React.useState(false);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    setSaveValid(value && value.trim().length > 0 && servings && servingsValid);
  };

  const handleServingsChange = (event) => {
    const num = +event.target.value;
    const isValid = Number.isInteger(num) && num >= 1 && num <= 21;
    setServings(event.target.value);
    setServingsValid(isValid);
    setSaveValid(name && name.trim().length > 0 && isValid);
  };

  const handleClose = () => {
    onClose();

    // Reset state
    setName('');
    setServings('');
    setServingsValid(true);
    setSaveValid(false);
  };

  const handleSave = () => {
    if (saveValid) {
      onSave({ name: name.trim(), servings: +servings });
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
          error={!servingsValid}
          helperText={servingsValid ? '' : 'Servings must be an integer from 1 to 21'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!saveValid} color="primary">
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
