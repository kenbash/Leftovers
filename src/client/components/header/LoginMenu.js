import React, { Component } from 'react';
import {
  Button,
  IconButton,
  Popover,
  TextField,
  Typography
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateLogin
} from '../../services/UserService';

class LoginMenu extends Component {
  usernameRef = { focus: () => {} }; // used for autofocus

  constructor(props) {
    super(props);

    this.state = {
      user: null,
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
          this.setState({ loggedIn: true, user: username });
          updateLogin(true);
        }
      },
      err => console.error(err)
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
      `username=${encodeURIComponent(username)}`,
      `password=${encodeURIComponent(password)}`
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

  handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (username.trim() === '' || password === '') {
      this.setState({ hasError: true, infoText: 'Username and Password cannot be empty' });
      return;
    }

    this.setState({ hasError: false, infoText: '' });

    const userForm = [
      `username=${encodeURIComponent(username)}`,
      `password=${encodeURIComponent(password)}`
    ];
    loginUser(userForm.join('&')).then(
      (status) => {
        if (status === 200) {
          updateLogin(true);
          this.handleClose();
          setTimeout(() => this.setState({ loggedIn: true, user: username }), 500);
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
        updateLogin(false);
        this.handleClose();
        setTimeout(() => this.setState({ loggedIn: false, user: null }), 500);
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
      user,
      loggedIn,
      username,
      password,
      infoText,
      hasError,
      menuAnchor
    } = this.state;

    if (loggedIn) {
      return (
        <React.Fragment>
          <IconButton className="header-btn" onClick={this.openMenu}>
            <AccountCircleIcon />
          </IconButton>
          <Popover
            id="logout-menu"
            open={!!menuAnchor}
            anchorEl={menuAnchor}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            disableEnforceFocus
            onClose={this.handleClose}
          >
            <div className="menu-content-wrapper">
              <Typography variant="h6">
                {`Hello, ${user}`}
              </Typography>
              <Button color="primary" variant="contained" onClick={this.handleLogout}>Log Out</Button>
            </div>
          </Popover>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Button className="header-btn" aria-controls="login-menu" aria-haspopup="true" onClick={this.openMenu}>Log In</Button>
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
            <form onSubmit={this.handleLogin} noValidate autoComplete="off">
              <TextField
                id="username"
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
                id="password"
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
              <Button color="primary" variant="contained" type="submit" className="login-btn">Log In</Button>
            </form>
            <Button variant="outlined" onClick={this.handleRegister}>Register</Button>
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default LoginMenu;
