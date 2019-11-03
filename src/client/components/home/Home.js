import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Paper } from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { rightcb, leftcb } = this.props;
    return (
      <Container className="home-wrapper">
        <Paper className="paper-wrapper">
          <div className="button-wrapper">
            <Button color="primary" variant="contained" size="large" startIcon={<CachedIcon />}>
              Generate
            </Button>
            <Button color="primary" variant="contained" size="large" onClick={rightcb} startIcon={<FastfoodIcon />}>
              View Meals
            </Button>
          </div>
          <h1>Grid</h1>
          <Button size="small" onClick={leftcb}>
            go to details
          </Button>
        </Paper>
      </Container>
    );
  }
}

Home.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default Home;
