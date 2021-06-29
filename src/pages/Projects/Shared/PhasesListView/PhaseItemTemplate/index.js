import React, { memo } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.custom.palette.lightGreen,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px !important`,
  },
}));

const PhaseItemTemplate = ({ fields }) => {
  const classes = useStyles();

  return (
    <div>
      {fields?.map((field, index) => (
        <Card key={index} className={classes.container}>
          <CardContent className={classes.content}>
            <div>
              <Typography color="textPrimary">{field.name}</Typography>
              <Typography color="textPrimary">{field.projectName}</Typography>
              <Typography color="textPrimary">{field.status * 100}%</Typography>
            </div>
            <ContainedButton>Detail</ContainedButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default memo(PhaseItemTemplate);
