import React, { memo } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import {
  Grid,
  Hidden,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'

import UserDropdown from './UserDropdown';
import SearchInput from './SearchInput';
import UserInfo from './UserInfo';

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const useStyles = makeStyles(() => ({
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const Header = ({ onDrawerToggle }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position='sticky' elevation={0}>
        <Toolbar>
          <Grid container alignItems='center'>
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color='inherit'
                  aria-label='Open drawer'
                  onClick={onDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item>
              <SearchInput />
            </Grid>
            <Grid item xs />
            <Grid item>
              <div className={classes.userInfo}>
                <UserInfo />
                <UserDropdown />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
};

export default memo(withTheme(Header));
