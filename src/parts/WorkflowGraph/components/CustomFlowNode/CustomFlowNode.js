import React, { memo, useState, useEffect, useMemo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Popper, Fade, Box, Button, Chip } from '@material-ui/core';
import { NodeDialog } from './components';
import CloseIcon from '@material-ui/icons/Close';
import { IDENTIFIERS, HANDLE_TYPES, NODE_DIALOGS, NODE_PROPS } from 'parts/WorkflowGraph/constants';
import { ColorButton } from 'components/UI/Buttons';
import { useStyles } from './styles';
import { COLORS } from 'parts/WorkflowGraph/constants';
import { isEmpty } from 'utils/helpers/utility';
import moment from 'moment';

const CustomFlowNodeFactory = (tClass, sClass) =>
  memo(({ id, data }) => {
    const [popperElement, setPopperElement] = useState(null);
    const isPopperOpen = Boolean(popperElement);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState(null);
    const isRealNode = useMemo(() => !isEmpty(data.calculated), [data]);
    const { diffColor, differential } = useMemo(() => {
      if (!isRealNode) {
        return {};
      }

      const diffThreshold = data.differentialWeight * (moment(data.end) - moment(data.start));
      const differential = data.calculated.differential;
      let diffColor = null;

      if (differential <= 0) {
        diffColor = COLORS.green;
      } else if (differential <= diffThreshold) {
        diffColor = COLORS.yellow;
      } else {
        diffColor = COLORS.red;
      }

      return { diffColor, differential };
    }, [data, isRealNode]);

    const classes = useStyles({ diffColor });
    const nodeLabel = useMemo(() => {
      let { label } = data;
      const tag = document.createElement('div');
      tag.className = classes.checkOverflow;
      document.body.appendChild(tag);

      tag.innerHTML = label;
      let overflowed = false;

      while (tag.clientHeight > NODE_PROPS.height - 40) {
        label = label.split(' ').slice(0, -1).join(' ');
        tag.innerHTML = label + '...';
        overflowed = true;
      }

      document.body.removeChild(tag);

      return label + (overflowed ? '...' : '');
    }, [data, classes]);

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
              <Box>
                <div className={classes.labelContainer}>
                  <div className={classes.label}>{nodeLabel}</div>
                </div>
                <div className={classes.chipContainer}>
                  <Chip label={`${differential > 0 ? '+' : ''}${differential}`} className={classes.chip} />
                </div>
                <div className={classes.statusContainer}>
                  <Box align="center">
                    EV <br /> {Math.round(data.calculated.EV)}%
                  </Box>
                  <Box align="center">
                    PV <br /> {Math.round(data.calculated.PV)}%
                  </Box>
                </div>
              </Box>
            ) : (
              <div className={classes.name}>{data.label || <small>Double-click to edit</small>}</div>
            )}
          </div>

          <Popper open={isPopperOpen} anchorEl={popperElement} className={classes.nodePopupContainer} transition>
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
