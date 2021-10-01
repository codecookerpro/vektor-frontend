import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, Paper, Popper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { DetailDialog } from './components';
import useStyles from './styles';
import usePhaseItemLogic from './helpers';
import { Flag } from '@material-ui/icons';
import DeliverableNotesTable from 'parts/DeliverableNotesTable';
import { CHECKED_FLAG_COLOR, UNCHECKED_FLAG_COLOR } from './constants';

const PhaseItem = ({ item, canDrag = true }) => {
  const { isDragging, dragRef, onClick } = usePhaseItemLogic(item, canDrag);
  const users = useSelector((state) => state.users.results);
  const classes = useStyles({ isDragging });
  const [toggledDetail, toggleDetail] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopperOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
  };

  const noteAvailable = useMemo(() => item.mainSystem.deliverables.some((d) => d.notes.length), [item]);
  const noteChecked = useMemo(
    () => item.mainSystem.deliverables.length && item.mainSystem.deliverables.every((d) => d.notes.length && d.notes.every((n) => n.status)),
    [item]
  );
  const noteElement = useMemo(
    () => (
      <Paper elevation={4} style={{ padding: 16 }}>
        {item.mainSystem.deliverables.map((d) =>
          d.notes.length ? (
            <Box p={4}>
              <Typography variant="h4">{d.name}</Typography>
              <DeliverableNotesTable rows={d.notes} key={d._id} users={users} />
            </Box>
          ) : null
        )}
      </Paper>
    ),
    [item, users]
  );

  return (
    <>
      <Card ref={dragRef} className={classes.container}>
        <CardContent className={classes.content} onClick={() => toggleDetail(true)} onMouseEnter={handlePopperOpen} onMouseLeave={handlePopperClose}>
          <div>
            <Box display="flex" color={noteChecked ? CHECKED_FLAG_COLOR : UNCHECKED_FLAG_COLOR}>
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
