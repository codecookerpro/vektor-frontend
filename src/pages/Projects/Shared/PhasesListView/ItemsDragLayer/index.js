import React from 'react';
import { DragLayer as dragLayer } from 'react-dnd';

import PhaseItemTemplate from '../PhaseItemTemplate';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const getFieldStyle = (isDragging) => {
  const style = {
    width: 300,
    maxWidth: 300,
  };
  style.opacity = isDragging ? 0.8 : 1;
  return style;
};

const getItemStyles = (currentOffset) => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const collect = (monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
});

const ItemsDragLayer = ({ item, itemType, isDragging, currentOffset }) => {
  const renderItem = (type, item) => {
    switch (type) {
      case 'ITEM':
        return <PhaseItemTemplate fields={item.fields} />;
      default:
        return null;
    }
  };

  return isDragging ? (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>
        <div style={getFieldStyle(isDragging)}>{renderItem(itemType, item)}</div>
      </div>
    </div>
  ) : null;
};

export default dragLayer(collect)(ItemsDragLayer);
