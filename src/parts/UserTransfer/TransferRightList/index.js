import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { ArrowLeft } from 'react-feather';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
  },
  header: {
    color: theme.custom.palette.white,
    backgroundColor: theme.custom.palette.lightGreen
  },
  list: {
    height: 246,
    overflowY: 'scroll'
  },
  selected: {
    backgroundColor: theme.custom.palette.grey
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  arrowIcon: {
    width: 15,
    marginRight: theme.spacing(2)
  }
}));

function TransferRightList({
  items,
  selectedItems,
  removeAll,
  selectItem
}) {
  const classes = useStyles();

  const handleToggle = (value) => () => {
    selectItem(value, 'right');
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title='Chosen assigned users'
        className={classes.header} />
      <List dense component='div' role='list' className={classes.list}>
        {
          items.map((item) => (
            <ListItem
              button
              key={item.id}
              role='listitem'
              onClick={handleToggle(item)}
              className={clsx({ [classes.selected]: selectedItems.findIndex((value) => item.id === value.id) !== -1 })}
            >
              <ListItemText
                id={`transfer-list-item-${item.id}-label`}
                primary={item.name} />
            </ListItem>
          ))
        }
      </List>
      <CardActions disableSpacing className={classes.actions}>
        <Button
          color='primary'
          onClick={removeAll}
        >
          <ArrowLeft className={classes.arrowIcon} /> Remove All
        </Button>
      </CardActions>
    </Card>
  );
}

export default memo(TransferRightList);
