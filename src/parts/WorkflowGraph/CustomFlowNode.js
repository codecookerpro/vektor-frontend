import React, { memo, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import NodeDialog from './NodeDialog';
import CloseIcon from '@material-ui/icons/Close';
import { IDENTIFIERS, HANDLE_COLORS, HANDLE_TYPES, NODE_DIALOGS } from './constants';

const useStyles = makeStyles(() => ({
  nodeContent: {
    width: 'calc(100% - 24px)',
    height: 'calc(100% - 14px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '7px',
    left: '12px',
    textAlign: 'center',
  },
  name: {
    width: '100%',
    margin: '0',
    overflowX: 'hidden',
    overflowY: 'auto',
    textOverflow: 'ellipsis',
    maxHeight: '100%',
  },
  nodePopupContainer: {
    zIndex: 100,
  },
  nodePopup: {
    marginTop: '50px',
    minHeight: '100px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 30px',
  },
  nodePopupButton: {
    width: '100%',
    marginBottom: '12px',
  },
  nodePopupCloseIcon: {
    position: 'relative',
    left: '100%',
    cursor: 'pointer',
  },
  handle: {
    background: HANDLE_COLORS.source,
  },
}));

export default memo(({ id, data }) => {
  const classes = useStyles();
  const [popperElement, setPopperElement] = useState(null);
  const isPopperOpen = Boolean(popperElement);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState(null);

  const handlePopUpToggle = (e) => {
    if (data.editable) {
      setPopperElement(popperElement ? null : e.currentTarget);
      data.handleSwitchPopup(popperElement ? null : e.currentTarget);
    }
  };

  const handleDeleteNodes = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
    setDialogProps(NODE_DIALOGS.delete);
  };

  const handleEditNodes = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
    setDialogProps(NODE_DIALOGS.edit);
  };

  const handleMargin = 15;
  const targetStyles = { background: HANDLE_COLORS.target, height: '9px', width: '9px', borderRadius: '50%' };
  const sourceStyles = { background: HANDLE_COLORS.source, height: '9px', width: '9px', borderRadius: '50%' };
  return (
    <>
      <div onDoubleClick={handlePopUpToggle}>
        <Handle
          type={HANDLE_TYPES.TARGET}
          style={{ ...targetStyles, marginLeft: '-2px', marginTop: `-${handleMargin}px` }}
          position={Position.Left}
          id={IDENTIFIERS.TARGET_LEFT}
        />

        <Handle
          type={HANDLE_TYPES.TARGET}
          style={{ ...targetStyles, marginTop: '-2px', marginLeft: `${handleMargin}px` }}
          position={Position.Top}
          id={IDENTIFIERS.TARGET_TOP}
        />

        <Handle
          type={HANDLE_TYPES.TARGET}
          style={{ ...targetStyles, marginRight: '-1px', marginTop: `${handleMargin}px` }}
          position={Position.Right}
          id={IDENTIFIERS.TARGET_RIGHT}
        />

        <Handle
          type={HANDLE_TYPES.TARGET}
          style={{ ...targetStyles, marginBottom: '-1px', marginLeft: `-${handleMargin}px` }}
          position={Position.Bottom}
          id={IDENTIFIERS.TARGET_BOTTOM}
        />
        <Handle
          type={HANDLE_TYPES.SOURCE}
          style={{ ...sourceStyles, marginLeft: '-2px', marginTop: `${handleMargin}px` }}
          position={Position.Left}
          id={IDENTIFIERS.SOURCE_LEFT}
        />

        <Handle
          type={HANDLE_TYPES.SOURCE}
          style={{ ...sourceStyles, marginTop: '-2px', marginLeft: `-${handleMargin}px` }}
          position={Position.Top}
          id={IDENTIFIERS.SOURCE_TOP}
        />

        <Handle
          type={HANDLE_TYPES.SOURCE}
          style={{ ...sourceStyles, marginRight: '-1px', marginTop: `-${handleMargin}px` }}
          position={Position.Right}
          id={IDENTIFIERS.SOURCE_RIGHT}
        />

        <Handle
          type={HANDLE_TYPES.SOURCE}
          style={{ ...sourceStyles, marginBottom: '-1px', marginLeft: `${handleMargin}px` }}
          position={Position.Bottom}
          id={IDENTIFIERS.SOURCE_BOTTOM}
        />

        <div className={classes.nodeContent}>
          <p className={classes.name}>{data.label || <small>Double-click to edit</small>}</p>
        </div>

        <Popper open={isPopperOpen} anchorEl={popperElement} className={classes.nodePopupContainer} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <div className={classes.nodePopup}>
                <CloseIcon className={classes.nodePopupCloseIcon} onClick={handlePopUpToggle} />
                <Button variant="contained" color="primary" className={classes.nodePopupButton} onClick={handleEditNodes}>
                  Edit
                </Button>
                <Button variant="contained" color="default" onClick={handleDeleteNodes}>
                  Delete
                </Button>
              </div>
            </Fade>
          )}
        </Popper>
      </div>
      <NodeDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        label={data.label}
        handleInputChange={data.handleInputChange}
        nodeId={id}
        handlePopUpToggle={handlePopUpToggle}
        dialogProps={dialogProps}
        handleDeleteNode={data.handleDeleteNode}
      />
    </>
  );
});
