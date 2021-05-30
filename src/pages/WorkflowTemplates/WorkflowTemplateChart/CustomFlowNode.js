import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import NodeDialog from './NodeDialog';
import CloseIcon from '@material-ui/icons/Close';
import * as nodeDialogConfigs from 'utils/constants/reactflow/node-dialog-configs';

const useStyles = makeStyles((theme) => ({
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
}));

export default memo(({ data }) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const isPopperOpen = Boolean(popperElement);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState(null);

  const handlePopUpToggle = (e) => {
    e.preventDefault();
    setPopperElement(popperElement ? null : e.currentTarget);
    data.handleSwitchPopup(popperElement ? null : e.currentTarget);
  };

  const handleDeleteNodes = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
    setDialogProps(nodeDialogConfigs.DELETE);
  };

  const handleEditNodes = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
    setDialogProps(nodeDialogConfigs.EDIT);
  };

  return (
    <>
      <div onDoubleClick={(e) => handlePopUpToggle(e)}>
        <Handle type="target" style={{ background: '#557fb9' }} position="top" id={'top-' + data.id} />
        <Handle type="target" style={{ background: '#557fb9' }} position="left" id={'left-' + data.id} />
        <div className={classes.nodeContent}>
          <p className={classes.name}>{name || <small>Double-click to edit</small>}</p>
        </div>
        <Handle type="source" style={{ background: '#f9037ede' }} position="bottom" id={'bottom-' + data.id} />
        <Handle type="source" style={{ background: '#f9037ede' }} position="right" id={'right-' + data.id} />
        <Popper open={isPopperOpen} anchorEl={popperElement} className={classes.nodePopupContainer} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <div className={classes.nodePopup}>
                <CloseIcon className={classes.nodePopupCloseIcon} onClick={(e) => handlePopUpToggle(e)} />
                <Button variant="contained" color="primary" className={classes.nodePopupButton} onClick={(e) => handleEditNodes(e)}>
                  Edit
                </Button>
                <Button variant="contained" color="default" onClick={(e) => handleDeleteNodes(e)}>
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
        name={name}
        setName={setName}
        label={data.label}
        handleInputChange={data.handleInputChange}
        nodeId={data.id}
        handlePopUpToggle={handlePopUpToggle}
        dialogProps={dialogProps}
        handleDeleteNode={data.handleDeleteNode}
      />
    </>
  );
});
