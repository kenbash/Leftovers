import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Paper
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import './MealList.scss';
import MealTable from './MealTable';
import MealDialog from './MealDialog';

class MealList extends Component {
  static applyFilter = (meals, filter) => (
    filter ? meals.filter(meal => meal.name.toLowerCase().indexOf(filter) !== -1) : meals
  );

  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      rows: [],
      filter: '',
      dialogOpen: false
    };
  }

  componentDidMount() {
    fetch('/api/meal/all')
      .then(res => res.json())
      .then((res) => {
        this.updateData(res);
      });
  }

  updateData(meals) {
    const { filter } = this.state;
    const rows = this.constructor.applyFilter(meals, filter);
    this.setState({ meals, rows });
  }

  updateFilter(value) {
    const { meals } = this.state;
    const filter = value.trim().toLowerCase();
    const rows = this.constructor.applyFilter(meals, filter);
    this.setState({ rows, filter });
  }

  addMeal(meal) {
    // TODO: Implement with back-end
    const { meals } = this.state;
    this.updateData([...meals, meal]);
  }

  toggleDialog(open) {
    this.setState({ dialogOpen: open });
  }

  render() {
    const { rightcb, leftcb } = this.props;
    const { rows, filter, dialogOpen } = this.state;

    return (
      <Container className="meal-list-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button color="primary" variant="contained" size="large" onClick={leftcb} startIcon={<HomeIcon />}>
              Home
            </Button>
            <Button color="primary" variant="contained" size="large" onClick={() => this.toggleDialog(true)} startIcon={<AddIcon />}>
              Add Meal
            </Button>
          </div>
          <MealTable rows={rows} filter={filter} onRowClick={rightcb} onFilterChange={val => this.updateFilter(val)} />
        </Paper>
        <MealDialog open={dialogOpen} onClose={() => this.toggleDialog(false)} onSave={meal => this.addMeal(meal)} />
      </Container>
    );
  }
}

MealList.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default MealList;
