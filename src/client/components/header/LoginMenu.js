import React, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getUser } from '../../services/UserService';

class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: undefined,
    };
  }

  componentDidMount() {
    getUser().then(
      (res) => {
        const { username } = res;

        if (username) {
          this.setState({ loggedIn: true, username });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  render() {
    const { loggedIn, username } = this.state;

    if (loggedIn) {
      console.log(username);
      return (
        <IconButton className="header-btn">
          <AccountCircleIcon />
        </IconButton>
      );
    }

    return (
      <Button className="header-btn">Login</Button>
    );
  }
}

export default LoginMenu;
