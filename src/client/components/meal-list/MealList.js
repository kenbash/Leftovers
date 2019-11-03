import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Paper } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import './MealList.scss';

class MealList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rightcb, leftcb } = this.props;
    return (
      <Container className="meal-list-wrapper">
        <Paper elevation={2} className="paper-wrapper">
          <div className="button-wrapper">
            <Button color="primary" variant="contained" size="large" onClick={leftcb} startIcon={<HomeIcon />}>
              Home
            </Button>
          </div>
          <h1>Meal List</h1>
          <Button size="small" onClick={rightcb}>
            go to details
          </Button>
        </Paper>
      </Container>
    );
  }
}

MealList.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default MealList;
