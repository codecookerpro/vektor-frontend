import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, CardHeader, IconButton, Link, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { DetailDialog, NotesDialog } from './components';
import useStyles from './styles';
import usePhaseItemLogic from './helpers';
import { Flag, Person } from '@material-ui/icons';
import { CHECKED_FLAG_COLOR, UNCHECKED_FLAG_COLOR } from './constants';
import { ColorButton } from 'components/UI/Buttons';
import LINKS from 'utils/constants/links';

const PhaseItem = ({ item, canDrag = true }) => {
  const { isDragging, dragRef, onClick } = usePhaseItemLogic(item, canDrag);
  const users = useSelector((state) => state.users.results);
  const classes = useStyles({ isDragging });
  const [toggledDetail, setToggledDetail] = useState(false);
  const [toggledNotes, setToggledNotes] = useState(false);

  const handleFlagClick = (e) => {
    e.stopPropagation();
    setToggledNotes(true);
  };

  const handleNotesClose = (e) => {
    setToggledNotes(false);
  };

  const handleDetailClose = (e) => {
    setToggledDetail(false);
  };

  const noteAvailable = useMemo(() => item.mainSystem.deliverables.some((d) => d.notes.length), [item]);
  const noteChecked = useMemo(
    () => item.mainSystem.deliverables.length && item.mainSystem.deliverables.every((d) => d.notes.length && d.notes.every((n) => n.status)),
    [item]
  );

  return (
    <>
      <Card ref={dragRef} className={classes.container}>
        {item.resource && (
          <CardHeader
            className={classes.header}
            title={
              <Box display="flex" alignItems="center">
                <Person color="primary" />
                <Link underline="hover" color="inherit" variant="body2" href={LINKS.EDIT_USER.HREF.replace(':id', item.resource)}>
                  {users.find((u) => u._id === item.resource)?.name}
                </Link>
              </Box>
            }
          />
        )}
        <CardContent className={classes.content} onClick={() => setToggledDetail(true)}>
          <div>
            <Box display="flex" color={noteChecked ? CHECKED_FLAG_COLOR : UNCHECKED_FLAG_COLOR}>
              {noteAvailable && (
                <IconButton className={classes.noteFlag} onClick={handleFlagClick} color="inherit">
                  <Flag color="inherit" />
                </IconButton>
              )}
              <Typography color="textPrimary">{item.name}</Typography>
            </Box>
            <Typography color="textPrimary">
              {item.mainSystem.status}% {item.equipmentNumber}
            </Typography>
          </div>
          <ColorButton colour="lightGreen" onClick={onClick}>
            Detail
          </ColorButton>
        </CardContent>
      </Card>
      <NotesDialog open={toggledNotes} deliverables={item.mainSystem.deliverables} users={users} onClose={handleNotesClose} />
      <DetailDialog open={toggledDetail} onClose={handleDetailClose} metaSystem={item} />
    </>
  );
};

export default PhaseItem;
