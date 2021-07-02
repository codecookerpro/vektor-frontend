import React, { memo, useState, useEffect, useMemo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import { NodeDialog } from './components';
import CloseIcon from '@material-ui/icons/Close';
import { IDENTIFIERS, HANDLE_TYPES, NODE_DIALOGS } from 'parts/WorkflowGraph/constants';
import { ColorButton } from 'components/UI/Buttons';
import { useStyles } from './styles';
import { COLORS } from './constants';
import { isEmpty } from 'utils/helpers/utility';

const CustomFlowNodeFactory = (tClass, sClass) =>
  memo(({ id, data }) => {
    const classes = useStyles(data);
    const [popperElement, setPopperElement] = useState(null);
    const isPopperOpen = Boolean(popperElement);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState(null);
    const isRealNode = useMemo(() => !isEmpty(data.calculated), [data]);

    useEffect(() => {
      if (isRealNode === false) {
        return;
      }

      const nodeElment = document.querySelectorAll(`[data-id="${id}"]`)[0];
      if (data.status >= 100) {
        nodeElment.style.borderColor = COLORS.green;
      } else if (data.status >= data.calculated.PV) {
        nodeElment.style.borderColor = COLORS.yellow;
      } else if (data.status < data.calculated.PV) {
        nodeElment.style.borderColor = COLORS.red;
      }
    }, [id, data, isRealNode]);

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

    return (
      <>
        <div onDoubleClick={handlePopUpToggle}>
          <Handle
            type={HANDLE_TYPES.target}
            className={tClass}
            position={Position.Left}
            id={IDENTIFIERS.targetLeft}
            isValidConnection={data.isValidConnection}
          />

          <Handle
            type={HANDLE_TYPES.target}
            className={tClass}
            position={Position.Top}
            id={IDENTIFIERS.targetTop}
            isValidConnection={data.isValidConnection}
          />

          <Handle
            type={HANDLE_TYPES.target}
            className={tClass}
            position={Position.Right}
            id={IDENTIFIERS.targetRight}
            isValidConnection={data.isValidConnection}
          />

          <Handle
            type={HANDLE_TYPES.target}
            className={tClass}
            position={Position.Bottom}
            id={IDENTIFIERS.targetBottom}
            isValidConnection={data.isValidConnection}
          />

          <Handle
            type={HANDLE_TYPES.source}
            className={sClass}
            position={Position.Left}
            id={IDENTIFIERS.sourceLeft}
            isValidConnection={data.isValidConnection}
          />

          <Handle
            type={HANDLE_TYPES.source}
            className={sClass}
            position={Position.Top}
            id={IDENTIFIERS.sourceTop}
            isValidConnection={data.isValidConnection}
          />

          <Handle
            type={HANDLE_TYPES.source}
            className={sClass}
            position={Position.Right}
            id={IDENTIFIERS.sourceRight}
            isValidConnection={data.isValidConnection}
          />

          <Handle
            type={HANDLE_TYPES.source}
            className={sClass}
            position={Position.Bottom}
            id={IDENTIFIERS.sourceBottom}
            isValidConnection={data.isValidConnection}
          />

          <div className={classes.nodeContent}>
            {isRealNode ? (
              <p className={classes.name}>{data.label || <small>Double-click to edit</small>}</p>
            ) : (
              <p className={classes.name}>{data.label || <small>Double-click to edit</small>}</p>
            )}
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

export default CustomFlowNodeFactory;
