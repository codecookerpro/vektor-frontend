import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreHoriz, Palette } from '@material-ui/icons';
import moment from 'moment';
import useStyles from './styles';
import { usePhaseBoxLogic } from './helpers';
import { ColorPicker } from 'material-ui-color';
import { updateProjectPhase } from 'redux/actions/projects';

const DetailBox = ({ phase, status, fields, onHeaderClick, onActionClick, phaseActions }) => {
  const dispatch = useDispatch();
  const { id: project } = useParams();
  const { name, orderIndex, _id, color: defaultColor } = phase || {};
  const [color, setColor] = useState(defaultColor);
  const classes = useStyles({ color });
  const { anchorEl, isPhaseActions, isOpen, dropRef, handleMenuClick, handleClose, handleActionClick } = usePhaseBoxLogic(
    _id,
    orderIndex,
    phaseActions,
    onActionClick
  );
  const isNewPhase = Boolean(onHeaderClick);
  const [colorPaletteOpened, setColorPaletteOpened] = useState(false);

  const openColorPalette = () => {
    setColor(defaultColor);
    setColorPaletteOpened(true);
  };

  const closeColorPalette = () => {
    dispatch(updateProjectPhase({ ...phase, mainId: project, color, status: undefined }));
    setColorPaletteOpened(false);
  };

  const handleColorChange = (newColor) => {
    setColor(`#${newColor.hex}`);
  };

  return (
    <div className={classes.container} ref={dropRef}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          className={isNewPhase ? classes.cardHeader : ''}
          title={isNewPhase || typeof name === 'object' ? name : `${name} (Status ${Math.round(status)}%)`}
          onClick={onHeaderClick}
          subheader={
            phase.start &&
            phase.end && (
              <Typography color="inherit">
                {moment(phase.start).format('DD/MM/YYYY')} - {moment(phase.end).format('DD/MM/YYYY')}
              </Typography>
            )
          }
          action={
            isPhaseActions ? (
              <>
                <IconButton aria-label="settings" onClick={handleMenuClick}>
                  <MoreHoriz />
                </IconButton>
                <Menu id="fade-menu" anchorEl={anchorEl} keepMounted open={isOpen} onClose={handleClose}>
                  {phaseActions.map(({ title, action }, idx) => (
                    <MenuItem key={idx} onClick={handleActionClick(action)}>
                      {title}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              isNewPhase === false &&
              (colorPaletteOpened ? (
                <ColorPicker hideTextfield openAtStart value={color} onChange={handleColorChange} onOpen={closeColorPalette} />
              ) : (
                <IconButton aria-label="color-palette" onClick={openColorPalette} color="inherit">
                  <Palette color="inherit" />
                </IconButton>
              ))
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

export default DetailBox;
