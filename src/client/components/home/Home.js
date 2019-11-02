import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from '@material-ui/core';
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
        <div className="button-wrapper">
          <Button color="primary" variant="contained" size="large">
            Generate
          </Button>
          <Button color="primary" variant="contained" size="large" onClick={rightcb}>
            View Meals
          </Button>
        </div>
        <h1>Grid</h1>
        <Button size="small" onClick={leftcb}>
          go to details
        </Button>
      </Container>
    );
  }
}

Home.propTypes = {
  rightcb: PropTypes.func.isRequired,
  leftcb: PropTypes.func.isRequired
};

export default Home;
