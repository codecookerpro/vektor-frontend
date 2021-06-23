import React, { memo, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import NodeDialog from './NodeDialog';
import CloseIcon from '@material-ui/icons/Close';
import { IDENTIFIERS, HANDLE_TYPES, NODE_DIALOGS, GRAPH_PROPS } from './constants';
import { ColorButton } from 'components/UI/Buttons';

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
    zIndex: GRAPH_PROPS.zIndex + 1,
  },
  nodePopup: {
    marginTop: '50px',
    minHeight: '100px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 30px',
    boxShadow: '0.3em 0.3em 1em rgb(0 0 0 / 30%)',
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

export const getCustomFlowNode = (tClass, sClass) => {
  return memo(({ id, data }) => {
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

    const handleStyles = { background: '#6283B6', height: '9px', width: '9px', borderRadius: '50%' };

    return (
      <>
        <div onDoubleClick={handlePopUpToggle}>
          <Handle
            type={HANDLE_TYPES.target}
            className={tClass}
            style={{ ...handleStyles, marginLeft: '-2px' }}
            position={Position.Left}
            id={IDENTIFIERS.targetLeft}
          />

          <Handle
            type={HANDLE_TYPES.target}
            className={tClass}
            style={{ ...handleStyles, marginTop: '-2px' }}
            position={Position.Top}
            id={IDENTIFIERS.targetTop}
          />

          <Handle
            type={HANDLE_TYPES.target}
            className={tClass}
            style={{ ...handleStyles, marginRight: '-1px' }}
            position={Position.Right}
            id={IDENTIFIERS.targetRight}
          />

          <Handle
            type={HANDLE_TYPES.target}
            className={tClass}
            style={{ ...handleStyles, marginBottom: '-1px' }}
            position={Position.Bottom}
            id={IDENTIFIERS.targetBottom}
          />

          <Handle
            type={HANDLE_TYPES.source}
            className={sClass}
            style={{ ...handleStyles, marginLeft: '-2px' }}
            position={Position.Left}
            id={IDENTIFIERS.sourceLeft}
          />

          <Handle
            type={HANDLE_TYPES.source}
            className={sClass}
            style={{ ...handleStyles, marginTop: '-2px' }}
            position={Position.Top}
            id={IDENTIFIERS.sourceTop}
          />

          <Handle
            type={HANDLE_TYPES.source}
            className={sClass}
            style={{ ...handleStyles, marginRight: '-1px' }}
            position={Position.Right}
            id={IDENTIFIERS.sourceRight}
          />

          <Handle
            type={HANDLE_TYPES.source}
            className={sClass}
            style={{ ...handleStyles, marginBottom: '-1px' }}
            position={Position.Bottom}
            id={IDENTIFIERS.sourceBottom}
          />

          <div className={classes.nodeContent}>
            <p className={classes.name}>{data.label || <small>Double-click to edit</small>}</p>
          </div>

          <Popper open={isPopperOpen} anchorEl={popperElement} className={classes.nodePopupContainer} transition boxShadow={5}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <div className={classes.nodePopup}>
                  <CloseIcon className={classes.nodePopupCloseIcon} onClick={handlePopUpToggle} />
                  <Button variant="contained" color="primary" className={classes.nodePopupButton} onClick={handleEditNodes}>
                    Edit
                  </Button>
                  <ColorButton colour="red" onClick={handleDeleteNodes}>
                    Delete
                  </ColorButton>
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
};
