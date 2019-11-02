import React, { Component } from 'react';
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

export default class App extends Component {
  state = { faceClass: FACE_CLASS.HOME.FROM_LIST };

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
    const { faceClass } = this.state;
    return (
      <React.Fragment>
        <Header />
        <main>
          <section className="temp">
            <button type="button" onClick={() => this.changeFace(false)}>
              Left
            </button>
            <button type="button" onClick={() => this.changeFace(true)}>
              Right
            </button>
          </section>
          <section className={faceClass}>
            <div className="meal-grid">
              <h1>Grid</h1>
            </div>
            <div className="meal-list">
              <h1>List</h1>
            </div>
            <div className="meal-detail">
              <h1>Detail</h1>
            </div>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

function Header() {
  return (
    <header>
      <h1>Leftovers</h1>
    </header>
  );
}
