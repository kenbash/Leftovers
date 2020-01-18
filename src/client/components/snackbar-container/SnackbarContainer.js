import React, { Component } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { onSnackbarSent } from '../../services/SnackbarService';

const DURATION = 6000; // amount of time before snackbar closes

class SnackbarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      type: 'info', // 'success' | 'info' | 'warning' | 'error'
      title: null,
      text: null
    };
  }

  componentDidMount() {
    onSnackbarSent((props) => {
      const { type, title, text } = props;
      this.setState({
        open: true,
        type: type || 'info',
        title,
        text
      });
    });
  }

  handleClose = (_event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ open: false });
  }

  render() {
    const {
      open, type, title, text
    } = this.state;

    return (
      <div className="snackbar-wrapper">
        <Snackbar open={open} onClose={this.handleClose} autoHideDuration={DURATION}>
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
