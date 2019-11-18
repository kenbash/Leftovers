import PropTypes from 'prop-types';

const Meal = PropTypes.shape({
  name: PropTypes.string,
  servings: PropTypes.number
});

export default Meal;
