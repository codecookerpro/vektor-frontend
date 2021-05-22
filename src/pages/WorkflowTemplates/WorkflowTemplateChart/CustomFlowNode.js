import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import { TextField } from '@material-ui/core';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  nodeContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  textField: {
    '&::after': {
      visibility: 'hidden'
    },
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
    console.log(e.target.value);
  }

  return (
    <>
      {/* to do, below onConnect function need to be used or deleted */}
      <Handle type='target' position='top' style={{ background: '#555' }} onConnect={(params) => console.log('handle onConnect', params)} />
      <Handle type='target' position='left' style={{ background: '#555' }} onConnect={(params) => console.log('handle onConnect', params)} />
      <div className={classes.nodeContent}>
        {isEditable ? (
          <TextField onBlur={handleNameUpdate} onChange={(e) => data.handleInputChange(data.id, e)} label={data.label} defaultValue={name} className={classes.textField}/>
        ) : (
          <>
            <p>{name}</p>
            <BorderColorOutlinedIcon onClick={() => setIsEditable(true)} style={{ position: 'absolute', right: '5px', top: '5px', color: '#4d84c0', cursor: 'pointer' }} />
          </>
        )}
      </div>
      <Handle type='source' position='bottom' id='a' style={{ background: '#555' }} />
      <Handle type='source' position='right' id='b' style={{ background: '#555' }} />
    </>
  );
});
