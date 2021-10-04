import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { Add, MoreHoriz, Palette, Remove } from '@material-ui/icons';
import { usePhaseBoxLogic } from './helpers';
import { ColorPicker } from 'material-ui-color';
import { updateProjectPhase } from 'redux/actions/projects';
import PhaseItem from '../PhaseItem';
import moment from 'moment';
import useStyles from './styles';

const PhaseBox = ({ phase, status, systems, onHeaderClick, onActionClick, phaseActions }) => {
  const dispatch = useDispatch();
  const { id: project } = useParams();
  const { name, orderIndex, _id, color: defaultColor } = phase || {};
  const [color, setColor] = useState(defaultColor);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles({ color });
  const { anchorEl, isPhaseActions, isOpen, dropRef, handleMenuClick, handleClose, handleActionClick } = usePhaseBoxLogic(
    _id,
    orderIndex,
    phaseActions,
    onActionClick
  );
  const isNewPhase = Boolean(onHeaderClick);
  const [colorPaletteOpened, setColorPaletteOpened] = useState(false);
  const completeSystems = useMemo(() => systems.filter((s) => s.mainSystem.status === 100), [systems]);
  const incompleteSystems = useMemo(() => systems.filter((s) => s.mainSystem.status < 100), [systems]);

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

  const handleExpand = () => {
    setExpanded((expanded) => !expanded);
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
          <Grid container direction="column" justify="space-between" spacing={3}>
            <Grid item container spacing={3}>
              {incompleteSystems.map((sys) => (
                <Grid key={sys._id} item xs={12}>
                  <PhaseItem item={sys} />
                </Grid>
              ))}
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={12} container>
                <Box width="calc(100% + 32px)" color="inherit" borderTop="1.5px solid" mx={-4} />
                <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
                  <Typography>Completed ({completeSystems.length})</Typography>
                  <IconButton color="inherit" onClick={handleExpand}>
                    {expanded ? <Remove color="inherit" /> : <Add color="inherit" />}
                  </IconButton>
                </Box>
              </Grid>
              {expanded &&
                completeSystems.map((sys) => (
                  <Grid key={sys._id} item xs={12} style={{ opacity: 0.5 }}>
                    <PhaseItem item={sys} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhaseBox;
