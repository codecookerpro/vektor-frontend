import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { DetailDialog } from './components';
import useStyles from './styles';
import usePhaseItemLogic from './helpers';

const PhaseItem = ({ item, projectId, canDrag = true }) => {
  const { isDragging, dragRef, onClick } = usePhaseItemLogic(item, projectId, canDrag);
  const classes = useStyles({ isDragging });
  const [toggledDetail, toggleDetail] = useState(false);

  return (
    <Card ref={dragRef} className={classes.container}>
      <CardContent className={classes.content} onClick={() => toggleDetail(true)}>
        <div>
          <Typography color="textPrimary">{item.name}</Typography>
          <Typography color="textPrimary">{item.mainSystem.calculated.status}%</Typography>
        </div>
        <ContainedButton onClick={onClick}>Detail</ContainedButton>
      </CardContent>
      <DetailDialog open={toggledDetail} onClose={() => toggleDetail(false)} metaSystem={item} />
    </Card>
  );
};

export default PhaseItem;
