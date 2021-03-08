import React, { memo, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import PhaseBox from "./PhaseBox";
import ItemsDragLayer from "./ItemsDragLayer";
import phases from "utils/temp/project-phases";
import { isEmpty } from "utils/helpers/utility";

const PhasesListView = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    let newData = {};
    for (const phase of phases) {
      newData = {
        ...newData,
        [phase.name]: [...phase.items],
      };
    }

    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveItem = (items, source, dropResult) => {
    console.log("items => ", items);
    console.log("source => ", source);
    console.log("dropResult => ", dropResult);
    // const leftItems =
    //   source === "left"
    //     ? data.leftItems.filter((x) => items.findIndex((y) => x === y) < 0)
    //     : data.leftItems.concat(items);

    // const rightItems =
    //   source === "left"
    //     ? data.rightItems.concat(items)
    //     : data.rightItems.filter((x) => items.findIndex((y) => x === y) < 0);
    // setData({ leftItems, rightItems });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ItemsDragLayer />
      {!isEmpty(data) && (
        <Grid container spacing={6}>
          {phases.map((phase, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <PhaseBox
                id={phase.name}
                fields={data[phase.name]}
                moveItem={moveItem}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </DndProvider>
  );
};

export default memo(PhasesListView);
