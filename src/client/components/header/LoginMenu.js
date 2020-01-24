import React, { Component } from 'react';
import {
  Button,
  IconButton,
  Popover,
  TextField
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getUser } from '../../services/UserService';

class LoginMenu extends Component {
  usernameRef = { focus: () => {} }; // used for autofocus

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      infoText: '',
      hasError: false,
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

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  openMenu = event => this.setState({ menuAnchor: event.currentTarget });

  handleClose = () => this.setState({ menuAnchor: null, username: '', password: '' });

  render() {
    const {
      loggedIn,
      username,
      password,
      infoText,
      hasError,
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

    return (
      <React.Fragment>
        <Button className="header-btn" aria-controls="login-menu" aria-haspopup="true" onClick={this.openMenu}>Login</Button>
        <Popover
          id="login-menu"
          open={!!menuAnchor}
          anchorEl={menuAnchor}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          disableEnforceFocus
          onEntering={() => this.usernameRef.focus()}
          onClose={this.handleClose}
        >
          <div className="menu-content-wrapper">
            <TextField
              label="Username"
              value={username}
              className="username-input"
              onChange={this.handleUsernameChange}
              margin="dense"
              type="text"
              fullWidth
              autoFocus
              inputProps={{ maxLength: 32, ref: (input) => { this.usernameRef = input; } }}
              error={hasError}
            />
            <TextField
              label="Password"
              value={password}
              className="password-input"
              onChange={this.handlePasswordChange}
              margin="dense"
              type="password"
              fullWidth
              inputProps={{ maxLength: 64 }}
              error={hasError}
              helperText={infoText}
            />
            <Button color="primary" variant="contained" onClick={this.handleClose} className="login-btn">Login</Button>
            <Button variant="outlined" onClick={this.handleClose} className="register-btn">Register</Button>
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default LoginMenu;
