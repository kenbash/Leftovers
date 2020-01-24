import React, { Component } from 'react';
import {
  Button,
  IconButton,
  Menu,
  TextField
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getUser } from '../../services/UserService';

class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: undefined,
      password: undefined,
      menuAnchor: null
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

  handleNameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  openMenu = event => this.setState({ menuAnchor: event.currentTarget });

  handleClose = () => this.setState({ menuAnchor: null });

  render() {
    const {
      loggedIn,
      username,
      password,
      menuAnchor
    } = this.state;

    if (loggedIn) {
      console.log(username);
      return (
        <IconButton className="header-btn">
          <AccountCircleIcon />
        </IconButton>
      );
    }

    // use form instead of textfields?
    // use css api for menu classes instead of wrapper
    // setup auto focus
    return (
      <React.Fragment>
        <Button className="header-btn" aria-controls="login-menu" aria-haspopup="true" onClick={this.openMenu}>Login</Button>
        <Menu
          id="login-menu"
          anchorEl={menuAnchor}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          open={!!menuAnchor}
          onClose={this.handleClose}
        >
          <div className="menu-content-wrapper">
            <TextField
              label="Username"
              value={username}
              className="login-menu-input"
              onChange={this.handleUsernameChange}
              margin="dense"
              type="text"
              fullWidth
              autoFocus
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              label="Password"
              value={password}
              className="meal-dialog-input"
              onChange={this.handlePasswordChange}
              margin="dense"
              type="password"
              fullWidth
            />
            <Button color="primary" variant="contained" size="large" onClick={this.handleClose}>Login</Button>
          </div>
        </Menu>
      </React.Fragment>
    );
  }
}

export default LoginMenu;
