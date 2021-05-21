import React from 'react';
import { Helmet } from 'react-helmet';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { StylesProvider, ThemeProvider as MuiThemeProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components/macro';
import { create } from 'jss';

import theme from 'theme';
import Routes from 'routes';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | Vector DynamixE" defaultTitle="Vector DynamixE - Admin Dashboard" />
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <Routes />
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
