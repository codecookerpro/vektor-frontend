import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  titleText: {
    textAlign: 'center',
    marginBottom: '12px',
  },
  dialogText: {
    width: '240px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '15px',
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const EdgeDialog = ({ toggled, setToggled, onDelete }) => {
  const classes = useStyles();

  return (
    <>
      <Dialog open={toggled} onClose={() => setToggled(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <div className={classes.dialog}>
          <DialogTitle id="alert-dialog-title" className={classes.titleText}>
            Delete Connector
          </DialogTitle>
          <DialogContent>Are you sure to delete this connector?</DialogContent>
          <DialogActions className={classes.actions}>
            <Button onClick={() => setToggled(false)} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={onDelete} color="primary" variant="contained" className={classes.deleteButton} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default EdgeDialog;
