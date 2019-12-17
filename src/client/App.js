import React, { Component } from 'react';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from './components/header/Header';
import Home from './components/home/Home';
import MealList from './components/meal-list/MealList';
import MealDetail from './components/meal-detail/MealDetail';
import './App.scss';

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
const LIGHT_THEME = createMuiTheme({
  palette: { type: 'light' }
});
const DARK_THEME = createMuiTheme({
  palette: { type: 'dark' }
});

export default class App extends Component {
  state = { faceClass: FACE_CLASS.HOME.FROM_LIST, mealDetail: {}, darkTheme: false };

  setMeal(meal) {
    this.setState({
      mealDetail: meal
    });
  }

  toggleTheme() {
    const { darkTheme } = this.state;
    this.setState({ darkTheme: !darkTheme });
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
    const { faceClass, mealDetail, darkTheme } = this.state;
    return (
      <ThemeProvider theme={darkTheme ? DARK_THEME : LIGHT_THEME}>
        <CssBaseline />
        <header>
          <Header themecb={() => this.toggleTheme()} />
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
            <MealList
              rightcb={(meal) => {
                this.setMeal(meal);
                this.changeFace(true);
              }}
              leftcb={() => this.changeFace(false)}
            />
          </section>
          <section className="meal-detail">
            <MealDetail
              meal={mealDetail}
              rightcb={() => this.changeFace(true)}
              leftcb={() => this.changeFace(false)}
            />
          </section>
        </main>
      </ThemeProvider>
    );
  }
}
