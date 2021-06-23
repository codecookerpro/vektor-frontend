import React, { memo } from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AUTH_BACKGROUND_IMAGE_PATH } from 'utils/constants/resources';
import Popup from 'components/UI/Popup';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${AUTH_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundColor: theme.palette.background.default,
    backgroundPositionY: 'top',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 520,
  },
}));

const Auth = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Popup />
      <CssBaseline />
      <GlobalStyle />
      <div className={classes.root}>
        <div className={classes.container}>{children}</div>
      </div>
    </>
  );
};

export default memo(Auth);
