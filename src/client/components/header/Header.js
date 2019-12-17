import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import GitHubIcon from '@material-ui/icons/GitHub';
import leftoversLogo from '../../assets/images/leftovers_logo.png';
import './Header.scss';

function Header(props) {
  const { themecb } = props;

  const [isDark, setIsDark] = React.useState(false);

  const changeTheme = () => {
    setIsDark(!isDark);
    themecb();
  };

  return (
    <div className="header-wrapper MuiPaper-elevation6">
      <img src={leftoversLogo} alt="Leftovers logo" />
      <div className="header-filler" />
      <Button className="header-btn">Log In</Button>
      <IconButton className="header-btn" onClick={changeTheme}>
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <IconButton className="header-btn" href="https://github.com/kenbash/Leftovers">
        <GitHubIcon />
      </IconButton>
    </div>
  );
}

Header.propTypes = {
  themecb: PropTypes.func.isRequired
};

export default Header;
