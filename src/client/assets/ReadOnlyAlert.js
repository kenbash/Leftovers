import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

function ReadOnlyAlert() {
  return (
    <Alert elevation={2} variant="outlined" severity="info" className="read-only-alert">
      <AlertTitle>Info</AlertTitle>
      This data is currently read-only.
      To create your own meal plans, please log in or create an account (no email required).
    </Alert>
  );
}

export default ReadOnlyAlert;
