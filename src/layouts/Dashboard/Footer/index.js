import React, { memo } from 'react';
import styled from 'styled-components/macro';
import {
  Grid,
  Hidden,
  List,
  ListItemText as MuiListItemText,
  ListItem as MuiListItem,
} from '@material-ui/core';

import FOOTER_MENU_LINKS from 'utils/constants/footer-menu';

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(1) / 4}px
    ${(props) => props.theme.spacing(4)}px;
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)}px;
  padding-right: ${(props) => props.theme.spacing(2)}px;
  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid container item xs={12}>
            <List>
              {
                FOOTER_MENU_LINKS.map((item, index) =>
                  <ListItem
                    key={index}
                    button={true}
                    component='a'
                    href={item.HREF}
                  >
                    <ListItemText primary={item.TITLE} />
                  </ListItem>
                )
              }
            </List>
          </Grid>
        </Hidden>
      </Grid>
    </Wrapper>
  );
}

export default memo(Footer);
