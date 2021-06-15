import { useState } from 'react';
import { useDrop } from 'react-dnd';

export const usePhaseBoxLogic = (orderIndex, phaseActions, fields, moveItem, onActionClick) => {
  const [, drop] = useDrop(
    () => ({
      accept: 'ITEM',
      drop: moveItem,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [moveItem]
  );
  const [selectedField, setSelectedField] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const isPhaseActions = Boolean(phaseActions) && phaseActions.length > 0;

  const clearItemSelection = () => {
    setSelectedField(null);
  };

  const handleItemSelection = (index) => {
    const field = index < 0 ? '' : fields[index];
    setSelectedField(field);
  };

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
    selectedField,
    isOpen,
    handleMenuClick,
    handleClose,
    handleActionClick,
    handleItemSelection,
    clearItemSelection,
    drop,
  };
};
