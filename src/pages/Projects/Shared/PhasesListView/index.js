import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import PhaseBox from './PhaseBox';
import ItemsDragLayer from './ItemsDragLayer';

const PhasesListView = ({ phases }) => {
  const moveItem = (items, source, dropResult) => {
    console.log('items => ', items);
    console.log('source => ', source);
    console.log('dropResult => ', dropResult);
    // const leftItems =
    //   source === 'left'
    //     ? data.leftItems.filter((x) => items.findIndex((y) => x === y) < 0)
    //     : data.leftItems.concat(items);

    // const rightItems =
    //   source === 'left'
    //     ? data.rightItems.concat(items)
    //     : data.rightItems.filter((x) => items.findIndex((y) => x === y) < 0);
    // setData({ leftItems, rightItems });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ItemsDragLayer />
      <Grid container spacing={6}>
        {phases.map((phase) => (
          <Grid key={phase._id} item xs={12} sm={6} md={3}>
            <PhaseBox orderIndex={phase.orderIndex} name={phase.name} fields={[]} moveItem={moveItem} />
          </Grid>
        ))}
      </Grid>
    </DndProvider>
  );
};

export default memo(PhasesListView);
