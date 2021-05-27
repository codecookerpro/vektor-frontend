import React, { memo } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
}));

const DetailLinkCard = ({ title, buttonLabel = 'Detail', onDetail }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography variant="h6" color="textPrimary" className={classes.title}>
          {title}
        </Typography>
        <ContainedButton onClick={onDetail}>{buttonLabel}</ContainedButton>
      </CardContent>
    </Card>
  );
};

export default memo(DetailLinkCard);
