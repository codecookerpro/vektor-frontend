import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import LINKS from 'utils/constants/links';
import { LOGO_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(() => ({
  picture: {
    display: 'flex',
  },
  img: {
    width: 152,
    height: 22,
    objectFit: 'contain',
  },
}));

const Logo = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Link component={NavLink} exact to={LINKS.OVERVIEW.HREF}>
      <picture className={clsx(classes.picture, className)} {...rest}>
        <source srcSet={LOGO_IMAGE_PATH} />
        <img className={classes.img} src={LOGO_IMAGE_PATH} alt="logo" />
      </picture>
    </Link>
  );
};

export default memo(Logo);
