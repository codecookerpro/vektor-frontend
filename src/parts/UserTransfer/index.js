import React, { memo, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import { ArrowRightCircle, ArrowLeftCircle } from 'react-feather';

import TransferLeftList from './TransferLeftList';
import TransferRightList from './TransferRightList';

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 30,
    backgroundColor: theme.custom.palette.grey,
  },
  arrowIcon: {
    padding: 0,
    margin: theme.spacing(1),
    cursor: 'pointer',
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

const UserTransfer = ({ users, assignedUsers = [], onAssignedUsers }) => {
  const classes = useStyles();
  const [leftChecked, setLeftChecked] = useState([]);
  const [rightChecked, setRightChecked] = useState([]);

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    setLeft(users);
    setRight([]);
    setLeftChecked([]);
    setRightChecked([]);
  }, [users]);

  useEffect(() => {
    setRight(assignedUsers);
  }, [assignedUsers]);

  useEffect(() => {
    onAssignedUsers(right);
  }, [right, onAssignedUsers]);

  const handleToggle = (value, side) => {
    const checked = side === 'left' ? leftChecked : rightChecked;
    const currentIndex = checked.findIndex((item) => item.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (side === 'left') {
      setLeftChecked(newChecked);
    } else {
      setRightChecked(newChecked);
    }
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeftChecked([]);
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setLeftChecked([]);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setRightChecked([]);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRightChecked([]);
    setRight([]);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TransferLeftList items={left} selectedItems={leftChecked} chooseAll={handleAllRight} selectItem={handleToggle} />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <div className={classes.actions}>
            <IconButton onClick={handleCheckedRight} disabled={leftChecked.length === 0} className={classes.arrowIcon}>
              <ArrowRightCircle />
            </IconButton>
            <IconButton onClick={handleCheckedLeft} disabled={rightChecked.length === 0} className={classes.arrowIcon}>
              <ArrowLeftCircle />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <Grid item>
        <TransferRightList items={right} selectedItems={rightChecked} removeAll={handleAllLeft} selectItem={handleToggle} />
      </Grid>
    </Grid>
  );
};

export default memo(UserTransfer);
