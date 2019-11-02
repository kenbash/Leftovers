import React, { Component } from 'react';
import './App.scss';

export default class App extends Component {
  state = { faceClass: 'home-face' };

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

    // export faceClass to enum later?
    switch (faceClass) {
      case 'home-face':
        newFace = dir ? 'list-face' : 'detail-face';
        break;
      case 'list-face':
        newFace = dir ? 'detail-face' : 'home-face';
        break;
      case 'detail-face':
        newFace = dir ? 'home-face' : 'list-face';
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
