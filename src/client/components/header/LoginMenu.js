import React, { Component } from 'react';
import {
  Button,
  IconButton,
  Popover,
  TextField
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser
} from '../../services/UserService';

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

  handleRegister = () => {
    const { username, password } = this.state;
    if (username.trim() === '' || password === '') {
      this.setState({ hasError: true, infoText: 'Username and Password cannot be empty' });
      return;
    }
    this.setState({ hasError: false, infoText: '' });

    const userForm = [
      `${encodeURIComponent('username')}=${encodeURIComponent(username)}`,
      `${encodeURIComponent('password')}=${encodeURIComponent(password)}`
    ];
    registerUser(userForm.join('&')).then(
      (status) => {
        if (status === 200) {
          this.setState({ infoText: 'Registration successful! Login to continue' });
        } else if (status === 409) {
          this.setState({ hasError: true, infoText: 'Username already in use' });
        } else {
          this.setState({ hasError: true, infoText: 'Registration failed, internal server error' });
        }
      },
      err => console.error(err)
    );
  }

  handleLogin = () => {
    const { username, password } = this.state;
    if (username.trim() === '' || password === '') {
      this.setState({ hasError: true, infoText: 'Username and Password cannot be empty' });
      return;
    }
    this.setState({ hasError: false, infoText: '' });

    const userForm = [
      `${encodeURIComponent('username')}=${encodeURIComponent(username)}`,
      `${encodeURIComponent('password')}=${encodeURIComponent(password)}`
    ];
    loginUser(userForm.join('&')).then(
      (status) => {
        if (status === 200) {
          this.setState({ loggedIn: true });
          this.handleClose();
        } else if (status === 401) {
          this.setState({ hasError: true, infoText: 'Invalid username or password' });
        } else {
          this.setState({ hasError: true, infoText: 'Login failed, internal server error' });
        }
      },
      err => console.error(err)
    );
  }

  handleLogout = () => {
    logoutUser().then(
      () => {
        this.setState({ loggedIn: false });
        this.handleClose();
      },
      err => console.error(err)
    );
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleClose = () => this.setState({
    menuAnchor: null,
    username: '',
    password: '',
    hasError: false,
    infoText: ''
  });

  openMenu = event => this.setState({ menuAnchor: event.currentTarget });

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
      return (
        <IconButton className="header-btn" onClick={this.handleLogout}>
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
            <Button color="primary" variant="contained" onClick={this.handleLogin} className="login-btn">Login</Button>
            <Button variant="outlined" onClick={this.handleRegister} className="register-btn">Register</Button>
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default LoginMenu;
