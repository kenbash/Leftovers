import React, { Component } from 'react';
import './App.scss';

export default class App extends Component {
  state = { data: null };

  componentDidMount() {
    fetch('/api/mealPlan')
      .then(res => res.json())
      .then(res => this.setState({ data: res.meal }));
  }

  render() {
    const { data } = this.state;
    return <div>{data ? <p>{`${data}`}</p> : <h1>Loading</h1>}</div>;
  }
}
