import React, { Component } from 'react';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  red, yellow, green, teal, blue, indigo, purple
} from '@material-ui/core/colors';
import { updateMealDetail } from './services/MealService';
import Header from './components/header/Header';
import Home from './components/home/Home';
import MealList from './components/meal-list/MealList';
import MealDetail from './components/meal-detail/MealDetail';
import SnackbarContainer from './components/snackbar-container/SnackbarContainer';
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
const THEME_KEY = 'LEFTOVERS_THEME';
const LIGHT_THEME = createMuiTheme({
  palette: {
    type: 'light',
    success: { main: green[500] },
    info: { main: indigo[500] },
    warning: { main: yellow[400] },
    error: { main: red[800] }
  }
});
const DARK_THEME = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: purple[200] },
    secondary: { main: teal[200] },
    success: { main: green[300] },
    info: { main: purple[200] },
    warning: { main: yellow[600] },
    error: { main: red[300] }
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);

    const theme = localStorage.getItem(THEME_KEY) || 'light-theme';
    document.body.className = theme;

    this.state = {
      faceClass: FACE_CLASS.HOME.FROM_LIST,
      darkTheme: theme === 'dark-theme',
    };
  }

  setTheme(isDark) {
    const theme = isDark ? 'dark-theme' : 'light-theme';
    document.body.className = theme;
    localStorage.setItem(THEME_KEY, theme);
    this.setState({ darkTheme: isDark });
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
    const { faceClass, darkTheme } = this.state;
    return (
      <ThemeProvider theme={darkTheme ? DARK_THEME : LIGHT_THEME}>
        <CssBaseline />
        <header>
          <Header themecb={x => this.setTheme(x)} dark={darkTheme} />
        </header>
        <main className={faceClass}>
          <section className="meal-grid">
            <Home
              leftcb={(id) => {
                updateMealDetail(id);
                this.changeFace(false);
              }}
              rightcb={() => this.changeFace(true)}
            />
          </section>
          <section className="meal-list">
            <MealList
              rightcb={(id) => {
                updateMealDetail(id);
                this.changeFace(true);
              }}
              leftcb={() => this.changeFace(false)}
            />
          </section>
          <section className="meal-detail">
            <MealDetail
              rightcb={() => this.changeFace(true)}
              leftcb={() => this.changeFace(false)}
            />
          </section>
        </main>
        <SnackbarContainer />
      </ThemeProvider>
    );
  }
}
