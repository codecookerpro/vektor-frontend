import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  ListItem,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    borderBottom: `2px solid ${theme.custom.palette.border}`
  },
  title: {
    fontWeight: 'bold'
  }
}));

const OverviewProjectCard = ({
  title,
  children,
}) => {
  const classes = useStyles()

  return (
    <Card>
      <ListItem className={classes.item}>
        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>
      </ListItem>
      {children}
    </Card>
  );
};

export default memo(OverviewProjectCard);
