import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*='MuiButton-root'] instead if you nest themes.
    '.MuiInputBase-root::before, .MuiInputBase-root::after': {
      display: 'none',
    },
  },
})(() => null);

const useStyles = makeStyles((theme) => ({
  nodeContent: {
    width: 'calc(100% - 24px)',
    height: 'calc(100% - 14px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '7px',
    left: '12px',
    textAlign: 'center',
  },
  handle: {
    background: '#555',
  },
  name: {
    width: '100%',
    margin: '0',
    overflowX: 'hidden',
    overflowY: 'auto',
    textOverflow: 'ellipsis',
    maxHeight: '100%',
  },
  nodePopupContainer: {
    zIndex: 100,
  },
  nodePopup: {
    marginTop: '50px',
    minHeight: '100px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 30px',
  },
  nodePopupButton: {
    width: '100%',
    marginBottom: '12px',
  },
  nodePopupTextAlign: {
    textAlign: 'center',
    marginBottom: '12px',
  },
  nodePopupCloseIcon: {
    position: 'relative',
    left: '100%',
    cursor: 'pointer',
  },
}));

export default memo(({ data }) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [nameTemp, setNameTemp] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const popperOpen = Boolean(popperElement);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePopUpClick = (e) => {
    e.preventDefault();
    setPopperElement(popperElement ? null : e.currentTarget);
    data.handleSwitchPopup(popperElement ? null : e.currentTarget);
  };

  const handleNameUpdate = (e) => {
    e.preventDefault();
    setNameTemp(e.target.value);
  };

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
  };

  const handleDialogApprove = (e) => {
    e.preventDefault();
    setDialogOpen(false);
    setName(nameTemp);
    data.handleInputChange(data.id, nameTemp);
  };

  return (
    <>
      <GlobalCss />
      <div onDoubleClick={(e) => handlePopUpClick(e)}>
        <Handle type="target" style={{ background: '#557fb9' }} position="top" id={'top-' + data.id} />
        <Handle type="target" style={{ background: '#557fb9' }} position="left" id={'left-' + data.id} />
        <div className={classes.nodeContent}>
          <p className={classes.name}>{name || <small>Double-click to edit</small>}</p>
        </div>
        <Handle type="source" style={{ background: '#f9037ede' }} position="bottom" id={'bottom-' + data.id} />
        <Handle type="source" style={{ background: '#f9037ede' }} position="right" id={'right-' + data.id} />
        <Popper open={popperOpen} anchorEl={popperElement} className={classes.nodePopupContainer} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <div className={classes.nodePopup}>
                <CloseIcon className={classes.nodePopupCloseIcon} onClick={(e) => handlePopUpClick(e)} />
                <Button variant="contained" color="primary" className={classes.nodePopupButton} onClick={handleDialogClickOpen}>
                  Edit
                </Button>
                <Button variant="contained" color="default" onClick={(e) => data.handleDeleteNode(data.id, e)}>
                  Delete
                </Button>
              </div>
            </Fade>
          )}
        </Popper>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" className={classes.nodePopupTextAlign}>
          {'EDIT'}
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleNameUpdate}
            label={data.label}
            defaultValue={name}
            className={classes.textField}
            multiline={true}
            rows={2}
            classes={{ root: classes.root }}
            autoFocus={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCancel} color="primary">
            {' '}
            Cancel{' '}
          </Button>
          <Button onClick={handleDialogApprove} color="primary" autoFocus>
            {' '}
            Approve{' '}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
