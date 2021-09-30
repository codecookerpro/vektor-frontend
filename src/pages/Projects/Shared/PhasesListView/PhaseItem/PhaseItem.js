import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, Paper, Popper, Typography } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { DetailDialog } from './components';
import useStyles from './styles';
import usePhaseItemLogic from './helpers';
import { Flag } from '@material-ui/icons';

const PhaseItem = ({ item, canDrag = true }) => {
  const { isDragging, dragRef, onClick } = usePhaseItemLogic(item, canDrag);
  const classes = useStyles({ isDragging });
  const [toggledDetail, toggleDetail] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopperOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
  };

  const noteAvailable = useMemo(() => item.mainSystem.deliverables.some((d) => d.note), [item]);
  // const noteChecked = useMemo(() => item.mainSystem.deliverables.every(d => d.note?.every(n => n.status)), [item]);
  const noteChecked = false;
  const noteElement = useMemo(
    () => (
      <Paper elevation={4} style={{ padding: 8 }}>
        {item.mainSystem.deliverables.map((d) => (
          <Typography key={d._id}>{d.note}</Typography>
        ))}
      </Paper>
    ),
    [item]
  );

  return (
    <>
      <Card ref={dragRef} className={classes.container}>
        <CardContent className={classes.content} onClick={() => toggleDetail(true)} onMouseEnter={handlePopperOpen} onMouseLeave={handlePopperClose}>
          <div>
            <Box display="flex" color={noteChecked ? '#40f603' : '#ff0200'}>
              <Flag color="inherit" />
              <Typography color="textPrimary">{item.name}</Typography>
            </Box>
            <Typography color="textPrimary">
              {item.mainSystem.status}% {item.equipmentNumber}
            </Typography>
          </div>
          <ContainedButton onClick={onClick}>Detail</ContainedButton>
        </CardContent>
      </Card>
      <Popper placement="bottom-start" open={Boolean(anchorEl) && noteAvailable} anchorEl={anchorEl} onClose={handlePopperClose}>
        {noteElement}
      </Popper>
      <DetailDialog open={toggledDetail} onClose={() => toggleDetail(false)} metaSystem={item} />
    </>
  );
};

export default PhaseItem;
