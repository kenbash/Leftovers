import PropTypes from 'prop-types';

const Meal = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  servings: PropTypes.number
});

export default Meal;
