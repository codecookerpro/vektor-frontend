import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardActions, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { ArrowRight } from 'react-feather';
import clsx from 'clsx';

import VektorSearchInput from 'components/UI/TextFields/VektorSearchInput';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
  },
  header: {
    color: theme.custom.palette.white,
    backgroundColor: theme.custom.palette.lightGreen,
  },
  list: {
    height: 186,
    overflowY: 'scroll',
  },
  filter: {
    width: '100%',
    padding: theme.spacing(4),
  },
  selected: {
    backgroundColor: theme.custom.palette.grey,
  },
  arrowIcon: {
    width: 15,
    marginLeft: theme.spacing(2),
  },
}));

function TransferLeftList({ items, selectedItems, chooseAll, selectItem }) {
  const classes = useStyles();

  const [filter, setFilter] = useState('');

  const handleToggle = (value) => () => {
    selectItem(value, 'left');
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Available assigned users" className={classes.header} />
      <VektorSearchInput placeholder="Filter" className={classes.filter} value={filter} onChange={(e) => setFilter(e.target.value)} />
      <List dense component="div" role="list" className={classes.list}>
        {items
          .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
          .map((item) => (
            <ListItem
              button
              key={item.id}
              role="listitem"
              onClick={handleToggle(item)}
              className={clsx({
                [classes.selected]: selectedItems.findIndex((value) => item.id === value.id) !== -1,
              })}
            >
              <ListItemText id={`transfer-list-item-${item.id}-label`} primary={item.name} />
            </ListItem>
          ))}
      </List>
      <CardActions disableSpacing>
        <Button color="primary" onClick={chooseAll}>
          Choose All <ArrowRight className={classes.arrowIcon} />
        </Button>
      </CardActions>
    </Card>
  );
}

export default memo(TransferLeftList);
