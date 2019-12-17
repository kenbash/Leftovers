import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Typography } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Header.scss';

function Header(props) {
  const { themecb, dark } = props;

  const [isDark, setIsDark] = React.useState(dark);

  const changeTheme = () => {
    themecb(!isDark);
    setIsDark(!isDark);
  };

  return (
    <div className="header-wrapper MuiPaper-elevation6">
      <Typography variant="h6">Leftovers</Typography>
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
  themecb: PropTypes.func.isRequired,
  dark: PropTypes.bool.isRequired
};

export default Header;
