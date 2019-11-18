import React, { Component } from 'react';
import { CssBaseline } from '@material-ui/core';
import './App.scss';
import Header from './components/header/Header';
import Home from './components/home/Home';
import MealList from './components/meal-list/MealList';
import MealDetail from './components/meal-detail/MealDetail';

const FACE_CLASS = {
  HOME: {
    FROM_LIST: 'home-face wrap-detail',
    FROM_DETAIL: 'home-face wrap-list'
  },
  LIST: {
    FROM_HOME: 'list-face wrap-detail',
    FROM_DETAIL: 'list-face wrap-home'
  },
  DETAIL: {
    FROM_HOME: 'detail-face wrap-list',
    FROM_LIST: 'detail-face wrap-home'
  }
};

export default class App extends Component {
  state = { faceClass: FACE_CLASS.HOME.FROM_LIST, mealDetail: '' };

  componentDidMount() {
    // fetch('/api/meal?name=SteakDinner')
    //   .then(res => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });
    // const test = JSON.stringify({
    //   name: 'testFood1234',
    //   servings: 3
    // });
    // fetch('/api/meal/create', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: test
    // }).then(res => console.log(res));
  }

  setMeal(meal) {
    this.setState({
      mealDetail: meal
    });
  }

  changeFace(dir) {
    const { faceClass } = this.state;
    let newFace;

    switch (faceClass) {
      case FACE_CLASS.HOME.FROM_LIST:
      case FACE_CLASS.HOME.FROM_DETAIL:
        newFace = dir ? FACE_CLASS.LIST.FROM_HOME : FACE_CLASS.DETAIL.FROM_HOME;
        break;
      case FACE_CLASS.LIST.FROM_HOME:
      case FACE_CLASS.LIST.FROM_DETAIL:
        newFace = dir ? FACE_CLASS.DETAIL.FROM_LIST : FACE_CLASS.HOME.FROM_LIST;
        break;
      case FACE_CLASS.DETAIL.FROM_HOME:
      case FACE_CLASS.DETAIL.FROM_LIST:
        newFace = dir ? FACE_CLASS.HOME.FROM_DETAIL : FACE_CLASS.LIST.FROM_DETAIL;
        break;
      default:
        newFace = faceClass;
        break;
    }

    this.setState({
      faceClass: newFace
    });
  }

  render() {
    const { faceClass, mealDetail } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <header>
          <Header />
        </header>
        <main className={faceClass}>
          <section className="meal-grid">
            <Home
              leftcb={(meal) => {
                this.setMeal(meal);
                this.changeFace(false);
              }}
              rightcb={() => this.changeFace(true)}
            />
          </section>
          <section className="meal-list">
            <MealList rightcb={() => this.changeFace(true)} leftcb={() => this.changeFace(false)} />
          </section>
          <section className="meal-detail">
            <MealDetail meal={mealDetail} rightcb={() => this.changeFace(true)} leftcb={() => this.changeFace(false)} />
          </section>
        </main>
      </React.Fragment>
    );
  }
}
