import React from 'react';
import { Button } from '@material-ui/core';
import './Header.scss';
import leftoversLogo from '../../assets/images/leftovers_logo.png';

const Header = () => (
  <div className="header-wrapper MuiPaper-elevation6">
    <img src={leftoversLogo} alt="Leftovers logo" />
    <Button>Log In</Button>
  </div>
);

export default Header;
