import PropTypes from 'prop-types';

const Meal = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  servings: PropTypes.number,
  breakfast: PropTypes.bool,
  lunch: PropTypes.bool,
  dinner: PropTypes.bool
  // ingredients
});

// maybe remove this?

const MealName = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string
});

export { Meal, MealName };
