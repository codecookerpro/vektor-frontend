import React, { useState } from "react";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDrop } from "react-dnd";

import PhaseItem from "../PhaseItem";

const useStyles = makeStyles(() => ({
  content: {
    minHeight: 280,
  },
}));

const PhaseBox = ({ id, fields, moveItem }) => {
  const classes = useStyles();
  const [{}, drop] = useDrop(
    () => ({
      accept: "ITEM",
      drop: moveItem,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [moveItem]
  );
  const [selectedField, setSelectedField] = useState(null);

  const clearItemSelection = () => {
    setSelectedField(null);
  };

  const handleItemSelection = (index) => {
    const field = index < 0 ? "" : fields[index];
    setSelectedField(field);
  };

  return (
    <div ref={drop}>
      <Card>
        <CardHeader title={id} />
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            {fields.map((field, index) => (
              <Grid key={index} item xs={12}>
                <PhaseItem
                  item={field}
                  selectedSource={id}
                  moveItem={moveItem}
                  selectedField={selectedField}
                  clearItemSelection={clearItemSelection}
                  handleSelection={handleItemSelection}
                  index={index}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhaseBox;
