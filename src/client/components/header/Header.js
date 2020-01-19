import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Header.scss';

function Header(props) {
  const {
    themecb,
    dark,
    backcb,
    forwardcb,
    enableBack,
    enableForward
  } = props;

  const [isDark, setIsDark] = React.useState(dark);

  const changeTheme = () => {
    themecb(!isDark);
    setIsDark(!isDark);
  };

  return (
    <div className="header-wrapper MuiPaper-elevation6">
      <IconButton className="header-nav-btn" onClick={backcb} disabled={!enableBack}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton className="header-nav-btn" onClick={forwardcb} disabled={!enableForward}>
        <ArrowForwardIcon />
      </IconButton>
      <Typography className="header-title" variant="h6">Leftovers</Typography>
      <div className="header-filler" />
      <Button className="header-btn">Login</Button>
      <IconButton className="header-btn" onClick={changeTheme} title="Toggle light/dark theme">
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <IconButton className="header-btn" href="https://github.com/kenbash/Leftovers" title="View source">
        <GitHubIcon />
      </IconButton>
    </div>
  );
}

Header.propTypes = {
  themecb: PropTypes.func.isRequired,
  dark: PropTypes.bool.isRequired,
  backcb: PropTypes.func.isRequired,
  forwardcb: PropTypes.func.isRequired,
  enableBack: PropTypes.bool.isRequired,
  enableForward: PropTypes.bool.isRequired
};

export default Header;
