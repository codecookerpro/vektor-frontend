import React from 'react';
import { Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { usePhaseBoxLogic } from './helpers';

const PhaseBox = ({ phase, fields, onHeaderClick, onActionClick, phaseActions }) => {
  const { name, orderIndex, _id } = phase || {};

  const classes = useStyles();
  const { anchorEl, isPhaseActions, isOpen, dropRef, handleMenuClick, handleClose, handleActionClick } = usePhaseBoxLogic(
    _id,
    orderIndex,
    phaseActions,
    onActionClick
  );

  return (
    <div className={classes.container} ref={dropRef}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          className={onHeaderClick ? classes.cardHeader : ''}
          title={name}
          onClick={onHeaderClick}
          subheader={
            phase.start &&
            phase.end && (
              <div>
                {moment(phase.start).format('DD/MM/YYYY')} - {moment(phase.end).format('DD/MM/YYYY')}
              </div>
            )
          }
          action={
            isPhaseActions && (
              <>
                <IconButton aria-label="settings" onClick={handleMenuClick}>
                  <MoreHorizIcon />
                </IconButton>
                <Menu id="fade-menu" anchorEl={anchorEl} keepMounted open={isOpen} onClose={handleClose}>
                  {phaseActions.map(({ title, action }, idx) => (
                    <MenuItem key={idx} onClick={handleActionClick(action)}>
                      {title}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )
          }
        />
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            {fields}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhaseBox;
