import React from 'react';
import { DragSource as dragSource } from 'react-dnd';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.custom.palette.grey,
  },
  selectedItem: {
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px !important`,
  },
}));

const fieldSource = {
  beginDrag(props) {
    const dragFields = [props.item];
    return { fields: dragFields, source: props.selectedSource };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.moveItem(item.fields, item.source, dropResult);
      props.clearItemSelection();
    }
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const PhaseItem = ({
  index,
  item,
  selectedField,
  handleSelection,
  connectDragSource,
}) => {
  const classes = useStyles();

  const handleRowSelection = () => {
    handleSelection(index);
  };

  const detailHandler = () => { };

  return connectDragSource(
    <div>
      <Card
        className={clsx(classes.container, {
          [classes.selectedItem]: item.id === selectedField?.id,
        })}
        onClick={handleRowSelection}
      >
        <CardContent className={classes.content}>
          <div>
            <Typography color='textPrimary'>{item.name}</Typography>
            <Typography color='textPrimary'>{item.projectName}</Typography>
            <Typography color='textPrimary'>{item.status * 100}%</Typography>
          </div>
          <ContainedButton onClick={detailHandler}>Detail</ContainedButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default dragSource('ITEM', fieldSource, collect)(PhaseItem);
