import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';

import useStyles from './styles';
import usePhaseItemLogic from './helpers';

const PhaseItem = ({ item, projectId, canDrag = true }) => {
  const { isDragging, dragRef, onClick } = usePhaseItemLogic(item, projectId, canDrag);
  const classes = useStyles({ isDragging });

  return (
    <Card ref={dragRef} className={classes.container}>
      <CardContent className={classes.content}>
        <div>
          <Typography color="textPrimary">{item.name}</Typography>
          <Typography color="textPrimary">{item.mainSystem.calculated.status * 100}%</Typography>
        </div>
        <ContainedButton onClick={onClick}>Detail</ContainedButton>
      </CardContent>
    </Card>
  );
};

export default PhaseItem;
