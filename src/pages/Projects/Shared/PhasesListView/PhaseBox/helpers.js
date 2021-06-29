import { useState } from 'react';
import { useDrop } from 'react-dnd';

export const usePhaseBoxLogic = (_id, orderIndex, phaseActions, onActionClick) => {
  const [, dropRef] = useDrop({
    accept: 'ITEM',
    drop: () => ({ name: _id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const isPhaseActions = Boolean(phaseActions) && phaseActions.length > 0;

  const handleMenuClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action) => () => {
    onActionClick(action, orderIndex);
    setAnchorEl(null);
  };

  return {
    anchorEl,
    isPhaseActions,
    isOpen,
    dropRef,
    handleMenuClick,
    handleClose,
    handleActionClick,
  };
};
