import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Link,
  Typography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Divider = styled(MuiDivider)(spacing);

const PageHeader = ({
  title,
  links = []
}) => {
  return (
    <React.Fragment>
      <Helmet title='Profile' />

      <Typography variant='h3' gutterBottom display='inline'>
        {title}
      </Typography>

      <Breadcrumbs aria-label='Breadcrumb' mt={2}>
        {
          links.map((link, index) => (
            <Link
              exact
              key={index}
              component={NavLink}
              to={link.HREF}
            >
              {link.TITLE}
            </Link>
          ))
        }
        <Typography>{title}</Typography>
      </Breadcrumbs>

      <Divider my={6} />
    </React.Fragment>
  );
}

export default memo(PageHeader);
