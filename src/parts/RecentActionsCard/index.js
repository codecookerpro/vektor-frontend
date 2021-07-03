import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import getActionIcon from 'utils/helpers/getActionIcon';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  list: {
    margin: theme.spacing(4, 0),
    backgroundColor: theme.custom.palette.greyWhite,
    borderRadius: 4,
    border: `2px solid ${theme.custom.palette.grey}`,
  },
  itemIcon: {
    minWidth: 36,
  },
}));

function RecentActionsCard({ actions }) {
  const classes = useStyles();
  const history = useHistory();
  const users = useSelector((state) => state.users.results);

  const getUserName = (_id) => {
    const user = users.find((item) => item._id === _id);
    return user?.label || '';
  };

  const detailHandler = (action) => {
    history.push(LINKS.AUDIT_TRAIL_LOG_DETAIL.HREF.replace(':id', action._id));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Recent Actions
        </Typography>
        <Typography variant="body2" className={classes.title}>
          History of recent actions created through Vektor DynamixE
        </Typography>
        <div className={classes.demo}>
          <List dense>
            {actions.map((action, index) => (
              <ListItem key={index} className={classes.list}>
                <ListItemIcon className={classes.itemIcon}>{getActionIcon(action.actionType)}</ListItemIcon>
                <ListItemText primary={getUserName(action.user)} secondary={`${action.actionType} ${action.mName}`} />
                <ListItemSecondaryAction>
                  <ContainedButton onClick={() => detailHandler(action)}>View Detail</ContainedButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(RecentActionsCard);
