import React from 'react';
import { Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import PhaseItem from '../PhaseItem';

import useStyles from './styles';
import { usePhaseBoxLogic } from './helpers';

const PhaseBox = ({ orderIndex, name, fields, moveItem, onHeaderClick, onActionClick, phaseActions }) => {
  const classes = useStyles();
  const {
    anchorEl,
    isPhaseActions,
    selectedField,
    isOpen,
    handleMenuClick,
    handleClose,
    handleActionClick,
    handleItemSelection,
    clearItemSelection,
    drop,
  } = usePhaseBoxLogic(orderIndex, phaseActions, fields, moveItem, onActionClick);

  return (
    <div ref={drop}>
      <Card>
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
            {fields.length > 0 &&
              fields.map((field, index) => (
                <Grid key={index} item xs={12}>
                  <PhaseItem
                    item={field}
                    selectedSource={name}
                    moveItem={moveItem}
                    selectedField={selectedField}
                    clearItemSelection={clearItemSelection}
                    handleSelection={handleItemSelection}
                    index={index}
                  />
                </Grid>
              ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhaseBox;
