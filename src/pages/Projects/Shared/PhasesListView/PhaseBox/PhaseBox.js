import React from 'react';
import { Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
    <div ref={dropRef}>
      <Card className={classes.card}>
        <CardHeader
          className={onHeaderClick ? classes.cardHeader : ''}
          title={name}
          onClick={onHeaderClick}
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
