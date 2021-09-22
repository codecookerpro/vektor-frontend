import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, Typography } from '@material-ui/core';
import { Edit, Plus, PlusSquare } from 'react-feather';
import { LinkButton } from 'components/UI/Buttons';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${theme.custom.palette.border}`,
  },
  action: {
    display: 'flex',
    alignItems: 'center',
  },
  blueLink: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textDecoration: 'unset',
    width: 80,
    color: theme.palette.primary.main,
  },
  blackLink: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textDecoration: 'unset',
    color: theme.custom.palette.black,
    marginRight: theme.spacing(5),
  },
  icon: {
    width: 20,
    marginRight: theme.spacing(1),
  },
}));

const OverviewCardItem = ({ title, add, view, change }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <LinkButton to={view}>{title}</LinkButton>
      <div className={classes.action}>
        {add && (
          <Link to={add} className={classes.blackLink}>
            <Plus className={classes.icon} />
            Add
          </Link>
        )}
        {change && (
          <Link to={change} className={classes.blueLink}>
            <Edit className={classes.icon} />
            Edit
          </Link>
        )}
        {view && (
          <Link to={view} className={classes.blueLink}>
            <PlusSquare className={classes.icon} />
            View
          </Link>
        )}
      </div>
    </ListItem>
  );
};

export default memo(OverviewCardItem);
