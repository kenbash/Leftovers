import React, { Component } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { onSnackbarSent } from '../../services/SnackbarService';

class SnackbarContainer extends Component {
  messagQueue = [];

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      message: {
        key: undefined,
        type: 'info', // 'success' | 'info' | 'warning' | 'error'
        title: undefined,
        text: undefined
      }
    };
  }

  componentDidMount() {
    onSnackbarSent((props) => {
      this.messagQueue.push({ ...props, key: new Date().getTime() });

      const { open } = this.state;
      if (open) {
        this.setState({ open: false });
      } else {
        this.processQueue();
      }
    });
  }

  handleClose = (_event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ open: false });
  }

  handleExited = () => {
    this.processQueue();
  }

  processQueue() {
    if (this.messagQueue.length > 0) {
      this.setState({ open: true, message: this.messagQueue.shift() });
    }
  }

  render() {
    const { open, message } = this.state;
    const {
      key, type, title, text
    } = message;

    return (
      <div className="snackbar-wrapper">
        <Snackbar
          key={key}
          open={open}
          onClose={this.handleClose}
          onExited={this.handleExited}
          autoHideDuration={6000}
        >
          <Alert elevation={6} variant="filled" severity={type} onClose={this.handleClose}>
            {title ? <AlertTitle>{title}</AlertTitle> : null}
            {text}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default SnackbarContainer;
