import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import SunriseIcon from '../../assets/SunriseIcon';

function MealTimeSelector(props) {
  const { mealTime, handleChange } = props;
  const { breakfast, lunch, dinner } = mealTime;

  return (
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
                onChange={handleChange('breakfast')}
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
                onChange={handleChange('lunch')}
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
                onChange={handleChange('dinner')}
              />
          )}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}

MealTimeSelector.propTypes = {
  mealTime: PropTypes.shape({
    breakfast: PropTypes.bool,
    lunch: PropTypes.bool,
    dinner: PropTypes.bool
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default MealTimeSelector;
