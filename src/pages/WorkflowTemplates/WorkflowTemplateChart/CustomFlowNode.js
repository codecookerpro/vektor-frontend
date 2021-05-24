import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
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
  }
}));

export default memo(({ data }) => {
  const classes = useStyles();
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(null);

  const handleNameUpdate = (e) => {
    e.preventDefault();
    setIsEditable(false);
    setName(e.target.value);
  }

  return (
    <>
      <GlobalCss />
      <div onDoubleClick={() => setIsEditable(true)}>
        <Handle type='target' position='top' id={('top-' + data.id)} className={classes.handle} />
        <Handle type='target' position='left' id={('left-' + data.id)} className={classes.handle} />
        <div className={classes.nodeContent}>
          {isEditable ? (
            <TextField onBlur={handleNameUpdate} onChange={(e) => data.handleInputChange(data.id, e)} label={data.label} defaultValue={name} className={classes.textField} multiline={true} rows={2} classes={{root: classes.root}} autoFocus={true} />
          ) : (
            (name ? <p className={classes.name}>{name}</p> : (
              <p className={classes.name}><small>Double-tap to set name</small></p>
            ))
          )}
        </div>
        <Handle type='source' position='bottom' id={('bottom-' + data.id)} className={classes.handle} />
        <Handle type='source' position='right' id={('right-' + data.id)} className={classes.handle} />
      </div>
    </>
  );
});
